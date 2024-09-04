export const formatCurrency = (amount) => {
    return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
