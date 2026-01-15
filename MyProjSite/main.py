import asyncio
from aiogram import Bot, Dispatcher, F
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo, Message
from aiogram.filters import CommandStart, command

bot = Bot(token='7573243505:AAFjOdwhdc7V09oyVw5O4dKQkm7B-a24WpU')
dp = Dispatcher()
kb = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text='Перейти',  web_app=WebAppInfo(url='https://repkas.github.io/RepkaS/MyProjSite/index.html'))]], resize_keyboard=True, input_field_placeholder="ХОМЯК САМ СЕБЯ НЕ ПОТАПАЕТ...........")


@dp.message(CommandStart())
async def cmd_start(Message: Message):
    await Message.reply("Привет! Нажми на эту кнопку чтобы тапать гомяка!", reply_markup=kb)


@dp.message()
async def cmd_message(Message: Message):
    await Message.reply("Хомяка нахуй тапай, а не пиши", reply_markup=kb)


async def main():
    await dp.start_polling(bot)
    



if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Бот выключен")