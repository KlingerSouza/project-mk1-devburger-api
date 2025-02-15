import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('❌ Server failed to start:', err);
});
