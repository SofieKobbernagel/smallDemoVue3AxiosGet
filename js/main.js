const baseUrl = "http://localhost:5180/api/cars"

const app = Vue.createApp({
    data() {
        return {
            intro: 'Cars Vue App',
            carList:[],
            carVendor: '',
            carModel: '',
            carPrice: 0

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
                }
            )
            .catch(
                 error => {
                    console.log(error)
                 } 
            )



        },
        gemBil(){
            console.log("er i gemBil metoden");
        }
    },
    computed: {
        myComputed() {
            return ''
        },
        
    }
})
