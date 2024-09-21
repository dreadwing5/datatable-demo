// You might want to move this interface to a separate types file
export default interface Invoice {
  id: number;
  attributes: {
    companyCode: string;
    vendorCode: string;
    invoiceNumber: string;
    documentNumber: string;
    amountInDocumentCurrency: number;
    documentCurrency: string;
    historicMatchesCount: number;
    status: string;
    assignedUser: {
      firstName: string;
      lastName: string;
    };
    updatedBy: {
      firstName: string;
      lastName?: string;
    };
    updatedOn: string;
  };
}
