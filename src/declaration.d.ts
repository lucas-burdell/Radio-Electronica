// Required to allow importing images with webpack in typescript
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}