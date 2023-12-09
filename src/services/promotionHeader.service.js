const PromotionHeardRepository = require("../repositories/promotionHeader.repository");
const ApplicableCustomerRepository = require("../repositories/applicableCustomer.repository");
const CustomerRepository = require("../repositories/customer.repository");
const PromotionResultRepository = require("../repositories/promotionResult.repository");
const RankRepository = require("../repositories/rank.repository");
const s3Service = require("./awsS3.service");
const VND = require("../utils/VND.util");
const ProductRepository = require("../repositories/product.repository");

class PromotionHeaderService {
  async getAllPromotion(query) {
    return await PromotionHeardRepository.getAllPromotionHeader(query);
  }

  async getPromotionById(id) {
    const data = await PromotionHeardRepository.getPromotionHeaderById(id);
    const ranks =
      await ApplicableCustomerRepository.getRankCustomerByPromotionHeaderId(id);
    data.dataValues.ranks = ranks;
    return data;
  }

  async getPromotionByCode(code) {
    return await PromotionHeardRepository.getPromotionHeaderByCode(code);
  }

  async createPromotion(req) {
    const promotion = req.body;
    const image = req.file;
    const ranks = req.body.rank;
    console.log("ranks", typeof ranks);
    let listRank = [];
    if (typeof ranks === "string") {
      listRank.push(ranks);
    } else {
      listRank = ranks;
    }
    if (image) {
      const result = await s3Service.uploadFile(image);
      promotion.image = result;
    }
    promotion.statusPromotion = 0;
    // promotion.promotionCode = `PRO${promotion.promotionCode}`;
    const namePromotionIsExist =
      await PromotionHeardRepository.getPromotionHeaderByName(
        promotion.namePromotion
      );
    if (namePromotionIsExist) {
      throw new Error("Promotion is exist");
    }

    const newPromotion = await PromotionHeardRepository.createPromotionHeader(
      promotion
    );
    if (listRank && listRank.length > 0) {
      listRank.forEach(async (rank) => {
        await ApplicableCustomerRepository.createApplicableCustomer({
          rank_id: Number(rank),
          promotionHeader_id: Number(newPromotion.id),
        });
      });
    } else {
      const rankss = await RankRepository.getAllRank();
      rankss.forEach(async (rank) => {
        await ApplicableCustomerRepository.createApplicableCustomer({
          rank_id: Number(rank.id),
          promotionHeader_id: Number(newPromotion.id),
        });
      });
    }

    return newPromotion;
  }

  async updatePromotion(id, req) {
    const promotion = req.body;
    const image = req.file;
    const ranks = promotion.rank;
    let listRank = [];
    if (typeof ranks === "string") {
      listRank.push(ranks);
    } else {
      listRank = ranks;
    }
    if (image) {
      const result = await s3Service.uploadFile(image);
      promotion.image = result;
    }
    await PromotionHeardRepository.updatePromotionHeader(id, promotion);
    await ApplicableCustomerRepository.deleteApplicableCustomerByHeaderId(id);
    if (listRank && listRank.length > 0) {
      listRank.forEach(async (rank) => {
        await ApplicableCustomerRepository.createApplicableCustomer({
          rank_id: Number(rank),
          promotionHeader_id: Number(id),
        });
      });
    } else {
      const rankss = await RankRepository.getAllRank();
      rankss.forEach(async (rank) => {
        await ApplicableCustomerRepository.createApplicableCustomer({
          rank_id: Number(rank.id),
          promotionHeader_id: Number(id),
        });
      });
    }
    return { message: "Update success" };
  }

  async deletePromotion(id) {
    await PromotionHeardRepository.updatePromotionHeader(id, {
      statusPromotion: 3,
    });
    return { message: "Delete success" };
  }

  async checkPromotionApplicable(body) {
    const rank_id = await CustomerRepository.GetByPhone(body.phone);

    let result = [];
    const moneyView = 50000;
    const qtyView = 2;

    const applicableTotal =
      await ApplicableCustomerRepository.checkApplicablePromotionByTotalMoney({
        rank_id: rank_id.rank_id,
        ...body,
      });
    console.log("applicableTotal", applicableTotal);
    if (applicableTotal.length > 0) {
      let discountPercent;
      for (let i = 0; i < applicableTotal.length; i++) {
        // console.log(
        //   "total",
        //   applicableTotal[i].promotionHeader.PromotionLines[0]
        // );
        for (
          let j = 0;
          j < applicableTotal[i].promotionHeader.PromotionLines.length;
          j++
        ) {
          const { id, max_qty_per_customer_per_day, budget } =
            applicableTotal[i].promotionHeader.PromotionLines[j];
          const qtyUsedPromotionByCustomerPerDay =
            await PromotionResultRepository.qtyUsedPromotionByCustomerPerDay(
              id,
              rank_id.id,
              body.date
            );
          const totalMoneyUsedPromotion =
            await PromotionResultRepository.totalMoneyUsedPromotion(id);
          if (
            qtyUsedPromotionByCustomerPerDay >= max_qty_per_customer_per_day ||
            totalMoneyUsedPromotion + Number(body.totalMoney) >= budget
          ) {
            // console.log(
            //   "max_qty_per_customer_per_day",
            //   max_qty_per_customer_per_day,
            //   qtyUsedPromotionByCustomerPerDay
            // );
            // console.log("budget", budget, totalMoneyUsedPromotion);
            result = [];
            continue;
          }
          const {
            max_money_reduction,
            percent_reduction,
            total_purchase_amount,
          } =
            applicableTotal[i].promotionHeader.PromotionLines[j]
              .PromotionDetail;
          const discount =
            Math.floor((body.totalMoney * percent_reduction) / 100) >
            max_money_reduction
              ? max_money_reduction
              : Math.floor((body.totalMoney * percent_reduction) / 100);
          if (
            Number(total_purchase_amount - body.totalMoney <= moneyView) &&
            Number(total_purchase_amount - body.totalMoney > 0)
          ) {
            discountPercent = {
              message: `Hãy mua thêm ${VND.format(
                total_purchase_amount - body.totalMoney
              )} để được giảm ${percent_reduction}%`,
              warning: true,
            };
          } else if (body.totalMoney >= total_purchase_amount) {
            discountPercent = {
              discount: discount,
              promotionLine_id:
                applicableTotal[i].promotionHeader.PromotionLines[j].id,
              promotionCode:
                applicableTotal[i].promotionHeader.PromotionLines[j]
                  .promotionCode,
              message: `Bạn được giảm ${VND.format(
                discount
              )} khi mua ${VND.format(body.totalMoney)}`,
            };
          }
        }
      }
      if (discountPercent) {
        result.push(discountPercent);
      }
    }

    for (let i = 0; i < body.products.length; i++) {
      const data =
        await ApplicableCustomerRepository.checkApplicablePromotionByRankId({
          rank_id: rank_id.rank_id,
          idProductBuy: body.products[i].id,
          qtyBuy: body.products[i].qty,
          ...body,
        });
      if (data.length > 0) {
        let discountMoney;
        for (let j = 0; j < data.length; j++) {
          for (
            let k = 0;
            k < data[j].promotionHeader.PromotionLines.length;
            k++
          ) {
            const { id, max_qty_per_customer_per_day, budget } =
              data[j].promotionHeader.PromotionLines[k];
            const qtyUsedPromotionByCustomerPerDay =
              await PromotionResultRepository.qtyUsedPromotionByCustomerPerDay(
                id,
                rank_id.id,
                body.date
              );
            const totalMoneyUsedPromotion =
              await PromotionResultRepository.totalMoneyUsedPromotion(id);
            if (
              qtyUsedPromotionByCustomerPerDay >=
                max_qty_per_customer_per_day ||
              totalMoneyUsedPromotion + Number(body.totalMoney) >= budget
            ) {
              // console.log(
              //   "max_qty_per_customer_per_day",
              //   max_qty_per_customer_per_day,
              //   qtyUsedPromotionByCustomerPerDay
              // );
              // console.log("budget", budget, totalMoneyUsedPromotion);
              result = [];
              continue;
            }
            const { qty_buy, money_received, IdProduct_buy } =
              data[j].promotionHeader.PromotionLines[k].PromotionDetail;
            const discount =
              Math.floor(body.products[i].qty / qty_buy) * money_received;
            const { productName } = await ProductRepository.getProductById(
              IdProduct_buy
            );

            if (
              Number(qty_buy - body.products[i].qty <= qtyView) &&
              Number(qty_buy - body.products[i].qty > 0)
            ) {
              discountMoney = {
                message: `Hãy mua thêm ${
                  qty_buy - body.products[i].qty
                } vé ${productName} để được giảm ${VND.format(money_received)}`,
                warning: true,
              };
            } else if (body.products[i].qty >= qty_buy) {
              discountMoney = {
                discount: discount,
                promotionLine_id: data[j].promotionHeader.PromotionLines[k].id,
                promotionCode:
                  data[j].promotionHeader.PromotionLines[k].promotionCode,
                message: `Bạn được giảm ${VND.format(discount)} khi mua ${
                  body.products[i].qty
                } vé ${productName}`,
              };
            }
          }
        }
        if (discountMoney) {
          result.push(discountMoney);
        }
      }
    }
    return result;
  }
}

module.exports = new PromotionHeaderService();
