import user from './api/user.js';
import auth from './api/auth.js';
import profile from './api/profile.js';
import post from './api/post.js';
import postanalysis from './api/postanalysis.js';
import developernearme from './api/developernearme.js';

//routes for API
export default (app) => {
    app.use('/api/user', user); //user route
    app.use('/api/auth', auth); //authenticated route
    app.use('/api/profile', profile); //profile route
    app.use('/api/post', post); //post
    app.use('/api/analytics', postanalysis); //post analytics
    app.use('/api/map', developernearme); //fetch nearby developers
};
