import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Turkmenistan_Gerb from "../../../assets/Turkmenistan_Gerb.png";

const imageX = 100;
const imageY = 100;
const imageWidth = 100;
const imageHeight = 100;

const ShahsyKagyzy = () => {
  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const form = pdfDoc.getForm();

    // Первая страница
    const page1 = pdfDoc.addPage([595, 2042]);
    const margin = 50;
    const fontSize = 14;

    // === Загрузка герба ===
    const imageBytes = await fetch(Turkmenistan_Gerb).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imageBytes);

    // === Рамка по краям страницы ===
    page1.drawRectangle({
      x: 5,
      y: 5,
      width: page1.getWidth() - 10,
      height: page1.getHeight() - 10,
      borderColor: rgb(0, 0, 0),
      borderWidth: 2,
    });

    // === Рамка и изображение герба ===
    page1.drawRectangle({
      x: imageX,
      y: imageY,
      width: imageWidth,
      height: imageHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1.5,
    });

    page1.drawImage(pngImage, {
      x: imageX + 20,
      y: imageY + 10,
      width: imageWidth - 30,
      height: imageHeight - 30,
    });

    // === Заголовок ===
    page1.drawText("Please fill in your details", {
      x: margin,
      y: page1.getHeight() - margin - 20,
      size: fontSize,
      font,
      color: rgb(0, 0.53, 0.71),
    });

    const fieldWidth = 200;
    const fieldHeight = 20;

    // === Поля ввода на первой странице ===
    const firstNameY = page1.getHeight() - margin - 60;
    const firstNameField = form.createTextField("firstName");
    firstNameField.setText("");
    firstNameField.addToPage(page1, {
      x: margin,
      y: firstNameY,
      width: fieldWidth,
      height: fieldHeight,
    });

    const lastNameY = firstNameY - 40;
    const lastNameField = form.createTextField("lastName");
    lastNameField.setText("");
    lastNameField.addToPage(page1, {
      x: margin,
      y: lastNameY,
      width: fieldWidth,
      height: fieldHeight,
    });

    const dropdownY = lastNameY - 40;
    const bornCountryField = form.createDropdown("bornCountry");
    bornCountryField.addOptions([
      "Select Country",
      "USA",
      "Canada",
      "Germany",
      "India",
      "Brazil",
      "China",
      "Russia",
    ]);
    bornCountryField.select("Select Country");
    bornCountryField.addToPage(page1, {
      x: margin,
      y: dropdownY,
      width: fieldWidth,
      height: fieldHeight,
    });

    // === Вторая страница ===
    const page2 = pdfDoc.addPage([595, 842]); // A4

    // ⚪️ Серый фон под текстом (например, ширина и высота блока: 400x40)
    const backgroundX = margin;
    const backgroundY = page2.getHeight() - margin - 100;
    const backgroundWidth = 400;
    const backgroundHeight = 40;
    page2.drawRectangle({
      x: backgroundX,
      y: backgroundY,
      width: backgroundWidth,
      height: backgroundHeight,
      color: rgb(0.83, 0.83, 0.83), // Светло-серый фон
    });

    // Рисуем рамку вокруг прямоугольника
    page2.drawRectangle({
      x: backgroundX,
      y: backgroundY,
      width: backgroundWidth,
      height: backgroundHeight,
      borderColor: rgb(0, 0, 0), // Черный цвет для рамки
      borderWidth: 2, // Толщина рамки
    });

    // ⚫️ Чёрный текст поверх
    page2.drawText("Bu sahypa maglumat üçin ulanylýar", {
      x: backgroundX + 10, // небольшой отступ внутри блока
      y: backgroundY + 12,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });






    // === Генерация PDF ===
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-example.pdf";
    link.click();
  };

  return <button onClick={generatePdf}>Generate PDF with 2 Pages</button>;
};

export default ShahsyKagyzy;