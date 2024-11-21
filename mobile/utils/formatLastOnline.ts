const formatLastOnline = (lastOnline: string | null) => {
  if (!lastOnline) return '';
  const lastOnlineDate = new Date(lastOnline);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastOnlineDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 3) {
    return 'last been recently';
  } else {
    return `last seen ${lastOnlineDate.toLocaleDateString()}`;
  }
};

export default formatLastOnline;
