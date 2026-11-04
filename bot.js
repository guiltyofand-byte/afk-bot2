const mineflayer = require('mineflayer');

const PASSWORD = 'BARAA1234*';

function createBot() {
    const bot = mineflayer.createBot({
        host: 'evosmp.mcsh.gg',
        port: 25565,
        username: 'give90'
    });

    bot.on('spawn', () => {
        console.log('تم دخول البوت إلى السيرفر بنجاح!');
        
        // تسجيل الدخول والتسجيل تلقائياً بعد دخول السيرفر
        setTimeout(() => {
            bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
            bot.chat(`/login ${PASSWORD}`);
        }, 2000);

        // تلويح باليد خفيف كل 30 ثانية فقط لمنع الخمول بدون استهلاك موارد
        setInterval(() => {
            bot.swingArm('right');
        }, 30000);
    });

    // تفاعل تلقائي مع شات السيرفر لو طلب تسجيل الدخول
    bot.on('message', (message) => {
        const text = message.toString();
        if (text.includes('/register')) {
            bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
        } else if (text.includes('/login')) {
            bot.chat(`/login ${PASSWORD}`);
        }
    });

    bot.on('error', (err) => {
        console.log('خطأ:', err.message);
    });

    bot.on('end', () => {
        console.log('انقطع الاتصال، جاري إعادة المحاولة...');
        setTimeout(() => {
            createBot();
        }, 5000);
    });
}

createBot();