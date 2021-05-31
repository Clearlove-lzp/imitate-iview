<!-- des加密解密 -->
<template>
  <div>des加密解密</div>
</template>

<script>
import CryptoJs from 'crypto-js'
export default {
  props: {},
  data () {
    return {
      encodeStr: ''
    };
  },
  components: {},
  computed: {},
  methods: {
    encode() {
      let keyHex = CryptoJs.enc.Utf8.parse("12345678")
      let option = { mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7 }
      let encrypted = CryptoJs.DES.encrypt("{\"propertyd\":\"2021-05-17 11:11:14\",\"departmentId\":1002,\"customerCityNames\":[\"n/a\"],\"positionName\":\"未知\",\"loginTime\":\"2021-05-17 11:11:55\",\"loginName\":\"chenshuang\",\"host\":\"127.0.0.1\",\"bearer\":\"OGMwMTJkMGUtMDZlZC00NTI3LWI2NTUtMWQ5YTVlMjIxZDVlOmNoZW5zaHVhbmc6MTI3LjAuMC4xOjIwMjEtMDUtMTctMTEtMTEtNTUtMTIxOjo=\",\"propertyf\":\"是\",\"propertye\":\"444444444444444444444\",\"departmentName\":\"东信支撑-测试组\",\"customerBusinessNames\":[\"n/a\"],\"roleId\":345435,\"userName\":\"陈爽\",\"userId\":30241333,\"domainId\":345592,\"token\":\"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMDI0MTMzMyIsImlhdCI6MTYyMTIyMTExNywic3ViIjoi6ZmI54i9IiwiZXhwIjoxNjIxMzA3NTE3fQ.zAFT3TzSVhSLI5guosw8OUS4qQfwT-mDLN79joiSi-8\",\"positionId\":0,\"customerDepartNames\":[\"n/a\"],\"domainName\":\"东信支撑组\",\"roleName\":\"系统管理员A\",\"loginSource\":\"Default\"}", keyHex, option)
      // console.log(encrypted.ciphertext.toString()) // 返回hex格式密文，如需返回base64格式：encrypted.toString()
      console.log(encrypted.toString()) // 返回hex格式密文，如需返回base64格式：encrypted.toString()
      this.encodeStr = encrypted.toString();
      this.decode()
    },
    decode() {
      let key = CryptoJs.enc.Utf8.parse("12345678");
      // let decrypt = cryptoJs.DES.decrypt(
      //   {
      //     ciphertext: cryptoJs.enc.Hex.parse(message)
      //   },  // 若message是base64格式，则无需转16进制hex，直接传入message即可
      //   keyHex,
      //   {
      //     mode: cryptoJs.mode.ECB,
      //     padding: cryptoJs.pad.Pkcs7
      //   }
      // )
      let decrypt = CryptoJs.DES.decrypt(this.encodeStr, key, {
        mode: CryptoJs.mode.ECB,
        padding: CryptoJs.pad.Pkcs7
      });
      console.log(decrypt.toString(CryptoJs.enc.Utf8));
    }
  },
  watch: {},
  mounted() {
    this.encode()
    // this.decode()
  },
  created() {},
}
</script>

<style scoped>
</style>