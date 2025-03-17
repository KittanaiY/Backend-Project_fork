import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, 'uploads/');
    },
    filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req: any, file: any, cb: (arg0: null, arg1: boolean) => void) => {
    // Accept any file type
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
});