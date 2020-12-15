"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.sequelize.transaction((t) => {
      const date = new Date();
      return (async () => {
        await queryInterface.bulkInsert(
          "Processes",
          [
            { id: 0, name: "bpmnSmall", createdAt: date, updatedAt: date },
            { id: 1, name: "bpmnLarge", createdAt: date, updatedAt: date },
          ],
          { transaction: t }
        );
        await queryInterface.bulkInsert(
          "ProcessSteps",
          [
            {
              order: 0,
              processId: 0,
              type: "wait",
              documentType: "clientInvoice",
              company: 1,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 1,
              processId: 0,
              type: "emit",
              documentType: "supplierInvoice",
              company: 2,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 2,
              processId: 0,
              type: "wait",
              company: 2,
              documentType: "payment",
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 3,
              processId: 0,
              type: "emit",
              company: 1,
              documentType: "receipt",
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 0,
              processId: 1,
              type: "wait",
              documentType: "buyOrder",
              company: 1,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 1,
              processId: 1,
              type: "emit",
              documentType: "sellOrder",
              company: 2,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 2,
              processId: 1,
              type: "wait",
              documentType: "deliveryNote",
              company: 2,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 3,
              processId: 1,
              type: "emit",
              documentType: "orderReceipt",
              company: 1,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 4,
              processId: 1,
              type: "wait",
              documentType: "invoice",
              company: 2,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 5,
              processId: 1,
              type: "emit",
              documentType: "invoiceReceipt",
              company: 1,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 6,
              processId: 1,
              type: "wait",
              documentType: "payment",
              company: 1,
              createdAt: date,
              updatedAt: date,
            },
            {
              order: 7,
              processId: 1,
              type: "emit",
              documentType: "receipt",
              company: 2,
              createdAt: date,
              updatedAt: date,
            },
          ],
          { transaction: t }
        );
      })();
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Processes", {
      id: { [Sequelize.Op.in]: [0, 1] },
    });
  },
};
