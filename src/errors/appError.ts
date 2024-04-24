class AppError extends Error {
    status: number;
    message: string;
    code: string;
    data: any;

    constructor(
        message?: string,
        httpCode = 500,
        code = "UNEXPECTED_ERROR",
        data?: any
    ) {
        super(message || "");
        this.status = httpCode;
        this.message = message || "";
        this.code = code;
        this.data = data;
    }
}

export default AppError;
