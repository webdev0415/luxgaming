export const GiveawayState = [
  { i: 11, v: " Running" },
  { i: 21, v: "Allocated" },
  { i: 41, v: " Deleted" },
];

export const GiveawayPrizeState = [
  { i: 11, v: "Defined" },
  { i: 21, v: "Allocated" },
  { i: 41, v: "Deleted" },
];

export const MessageType = [
  { i: 11, v: "Automatic" },
  { i: 21, v: "Manual" },
];

export const MessageState = [
  { i: 11, v: "Sent" },
  { i: 41, v: "Deleted" },
];

export const ProfileTournamentRecordType = [{ i: 4, v: "Message" }];

export const TournamentAlgorithmType = [
  { i: 11, v: "Swiss" },
  { i: 21, v: "Single Elim" },
];

export const TournamentPaymentType = [
  { i: 11, v: "Free" },
  { i: 21, v: "Premium" },
];

export const TournamentState = {
  11: "Defining",
  21: "Available",
  31: " Started",
  41: "Archived",
  51: "Deleted",
};

export const trn_type = {
  11: "Free",
  21: "Premium",
};

export const tourn_state = {
  21: "available",
  31: "started",
  41: "archived",
};

export const TournamentJudgeRequestState = [
  { i: 11, v: "Requested" },
  { i: 21, v: "Checking" },
  { i: 31, v: "CaseClosed" },
];

export const TournamentPrizeType = [
  { i: 11, v: "LuxBucks" },
  { i: 21, v: "Dollar" },
  { i: 31, v: "Product" },
];

export const TournamentPrizeState = [
  { i: 11, v: "Defined" },
  { i: 21, v: "Allocated" },
  { i: 41, v: "Deleted" },
];

export const UserState = [
  { i: 0, v: "Active" },
  { i: 41, v: "Disabled" },
];

export const UserRoleType = [
  { i: 0, v: "User" },
  { i: 31, v: "Assistant" },
  { i: 91, v: "Admin" },
];

export const UserMediaType = [{ i: 11, v: "Image" }];

export const UserCreditLogType = [
  { i: 110, v: "AddByAdmin" },
  { i: 120, v: "AddByWinning" },
  { i: 210, v: "DeductByAdmin" },
  { i: 220, v: " DeductByPurchasingProduct" },
  { i: 230, v: "DeductByJoiningToTournament" },
];

export const ProfilePersonsRecordTypes = [
  { i: 1, v: "Phone" },
  { i: 2, v: "Email" },
  { i: 3, v: "Facebook" },
  { i: 6, v: "Avatar" },
  { i: 7, v: "Address" },
  { i: 8, v: "Name" },
];
