import { FileHelperImpl } from "./FileHelper";
import { Expose } from "./helpers";
import { RadioServiceImpl } from "./RadioService";

Expose('fileHelper', new FileHelperImpl());
Expose('radioService', new RadioServiceImpl());