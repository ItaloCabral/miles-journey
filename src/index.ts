import { App } from './app';
import { env } from './env';

App.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`)
});
