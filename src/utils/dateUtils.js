export function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}