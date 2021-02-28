export default (uri: string, params: Record<string, any>) => {
  for (const key in params) {
    const reg = new RegExp(`{${key}}`);
    if (uri.match(reg)) {
      uri = uri.replace(new RegExp(`{${key}}`), params[key]);
      delete params[key];
    }
  }
  uri = uri.replace(/{.*?}/g, "").replace(/\/$/, "");
  return { uri, params };
};
