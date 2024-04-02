declare module "vue-img-cutter" {
  // export { default as ImgCutter } from "vue-img-cutter";
  export interface CutImage {
    index: number;
    fileName: string;
    file: File;
    blob: Blob;
    dataURL: string;
  }

  export interface ImgCutterProps {
    isModal?: boolean;
    onCutDown?: (evt: CutImage) => void;
  }

  export interface ImgCutterSlots {
    open: () => VNode[];
  }

  export interface ImgCutter extends ComponentPublicInstance<ImgCutterProps> {
    handleOpen: (evt: Event) => void;
  }

  export const ImgCutter: ComponentConstructor<ImgCutter>;
}
