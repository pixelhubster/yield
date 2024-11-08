export interface SedaConfig {
   proverAddress: string;
 }
 
 export const networkConfigs: { [network: string]: SedaConfig } = {
   baseSepolia: {
     proverAddress: "0xcBC8a3159535BfE276ADaA8604940602e02c5457",
   }
 };
 