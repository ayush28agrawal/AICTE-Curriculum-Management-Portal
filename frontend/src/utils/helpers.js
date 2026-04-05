// Format date
export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Format date with time
export const formatDateTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get status badge class
export const getStatusClass = (status) => {
  const classes = {
    draft: 'status-draft',
    published: 'status-published',
    archived: 'status-archived',
    submitted: 'status-submitted',
    under_review: 'status-review',
    approved: 'status-approved',
    rejected: 'status-rejected'
  };
  return classes[status] || 'status-default';
};

// Get status label
export const getStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived',
    submitted: 'Submitted',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected'
  };
  return labels[status] || status;
};

// Download file from blob
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

