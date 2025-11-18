const baseUrl = "http://localhost:5180/api/cars"

const app = Vue.createApp({
    data() {
        return {
            intro: 'Cars Vue App',
            carList:[],
            carVendor: '',
            carModel: '',
            carPrice: 0,
            statuskode:'',
        }
    },
    methods: {
        myMethod(){

        },
        getAllCars(){
            console.log("er i metoden getAllCars");

            axios.get(baseUrl)
            .then(
                response => {
                    console.log(response)
                    this.carList = response.data
                    this.statuskode = response.status
                }
            
            )
            .catch(
                 error => {
                    console.log(error)
                    this.statuskode = error.response.status
                 } 
            )



        },
        gemBil(){
            console.log("er i gemBil metoden");
            
            axios.post(baseUrl, {
               "vendor": this.carVendor,
               "model": this.carModel,
               "price": this.carPrice
        })
        .then(
            response => {
                console.log(response);
                console.log(response.data);
            })

        .catch(error => {
            console.log(error);
        })
        }
    },
    computed: {
        myComputed() {
            return ''
        },
        
    }
})
