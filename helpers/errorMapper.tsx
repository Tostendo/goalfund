export const getErrorText = (messageId: string) => {
  if (messageId === "player_already_connected") {
    return "A user already connected to this player. If you think, this player is definitely you, please contact us via mail at <a href='mailto:help@goalfund.de'>help@goalfund.de</a>";
  }
  return "Something went wrong. Please try again. If the error still occurs, contact us at <a href='mailto:help@goalfund.de'>help@goalfund.de</a>";
};
