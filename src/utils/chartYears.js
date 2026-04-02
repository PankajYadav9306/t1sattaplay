export function getChartYears() {
    const currentYear = new Date().getFullYear();
    return [currentYear - 1, currentYear];
}

export function getChartYearRangeLabel() {
    const [previousYear, currentYear] = getChartYears();
    return `${previousYear} - ${currentYear}`;
}