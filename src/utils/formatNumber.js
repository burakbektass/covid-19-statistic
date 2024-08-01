export const formatNumber = (num) => {
    if(num === undefined || num === null){
      return "NaN"
    }
    return new Intl.NumberFormat('de-DE').format(num);
  };
  