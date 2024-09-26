const calculateRelativeTime = (lastOnline: string) => {
  const lastOnlineDate = new Date(lastOnline);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - lastOnlineDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Online';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export default calculateRelativeTime;