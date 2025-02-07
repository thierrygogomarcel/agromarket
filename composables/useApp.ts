export const useLogger = (id) => {
  return {
    log(...msg: any) {
      console.log(`[${id}]`, ...msg);
    },
  };
};
