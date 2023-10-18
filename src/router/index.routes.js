import { Router } from 'express';

const indexRouter = Router();

indexRouter.get ('/', (req, res) => {
    const user ={
        name: 'Juanito'
    }
    res.render('index', user)
})


export default indexRouter