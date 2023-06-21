/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { psy: 'bys' }
})


Route.post('/registeruser','AuthController.register');
Route.post('/login','AuthController.login')
Route.post('/logout','AuthController.logout')

Route.get('candidati/toatecategoriile','CandidatsController.toatecategoriile')
Route.get('candidati/toatefunctiile','CandidatsController.toatefunctiile')
Route.post('candidati/candidatnou','CandidatsController.candidatnou')
Route.post('candidati/tipexamennou','CandidatsController.tipExamenNou')
Route.get('candidati/caut/:criteriu/:slug','CandidatsController.cautcandidat')

Route.get('candidati/ultimii','CandidatsController.ultimiiCandidati')
Route.get('prezentari/azi','PrezentarisController.prezentarileZilei')
Route.get('prezentari/tipuriexamene','PrezentarisController.toateTipurileDeExamene')
Route.post('prezentari/prezentarenoua','PrezentarisController.prezentareNoua')
Route.post('prezentari/alocareteste','PrezentarisController.alocareteste')
Route.get('testari/azi','TestarisController.testarilezilei')
Route.get('testari/:id','TestarisController.unidentificator')
