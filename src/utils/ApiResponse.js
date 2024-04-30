// so it simplify the handling of api response by encapsulating relevant information in a structured format , promoting consistency and ease of use throghout the application 

class ApiResponse {
    constructor(statusCode , data , message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default ApiResponse;