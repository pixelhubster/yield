import {PinataSDK} from "pinata";

const pinata = new PinataSDK({
   pinataJwt: process.env.PINATA_JWT,
   pinataGateway: process.env.GATEWAY_URL
})

export default pinata