// this class provide a structure way to represent an errors in api allow develpoers to include detailed error informmation such as status code , messages , and additional data which can be useful for debugging and error handling in api applications

// APIERROR is a custom error class that extends the built-in Error class.
class ApiError extends Error{

    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack="",

    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}


export default ApiError;