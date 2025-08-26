import factorys from "./crypto.js";
// crypto-js
export function initKey() {
  var charSet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomKey = "";
  for (var i = 0; i < 23; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomKey += charSet.substring(randomPoz, randomPoz + 1);
  }
  console.log(randomKey, "--------randomKey");

  return randomKey;
}

export function encrypt(word, key) {
  console.log(word, key, "--------encrypted");
  var tmp_ = factorys.enc.Utf8.parse(key);
  var key_new = factorys.MD5(tmp_);
  var srcs = factorys.enc.Utf8.parse(word);
  var encrypted = factorys.AES.encrypt(srcs, key_new, {
    mode: factorys.mode.ECB,
    padding: factorys.pad.Pkcs7,
  });

  return encrypted.toString();
}
