-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 20-07-2022 a las 03:18:50
-- Versión del servidor: 5.7.33
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_libreria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `ISBN` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `editorial` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `carrera` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacion` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`ISBN`, `nombre`, `editorial`, `carrera`, `ubicacion`) VALUES
('8401921015', 'Compiladores', 'Pearson', 'Software', 'B2'),
('8402086969', 'Como programar en c++', 'Deitel', 'Software', 'A4'),
('8403083910', 'Ecological restoration', 'Island Press', 'Ambiental', 'D2'),
('8412123101', 'Advanced grammar in use', 'Cambridge', 'Inglés', 'A2'),
('8412340082', 'Energía mediante vapor, aire o gas', 'Reverté', 'Energía', 'B3'),
('8420617040', 'Análisis y diseño de algoritmos', 'Alfaomega', 'Software', 'A3'),
('8421348901', 'Nociones de derecho civil y mercantil', 'ISBN', 'PyMES', 'B1'),
('8421349800', 'Manual de climatización', 'IPN', 'Ambiental', 'C1'),
('8422621282', 'Antología personal', 'Dinamo', 'PyMES', 'C2'),
('8428930012', 'Ingeniería de software', 'Sommerville', 'Software', 'C2'),
('8430504737', 'Alternative energy systems', 'CRC Press', 'Energía', 'A1'),
('8437283781', 'Diseños experimentales', 'Trillas', 'Software', 'C4'),
('8453561911', 'Introduction to java programming', 'Pearson', 'Software', 'C4'),
('8456278901', 'Derechos del consumidor', 'IPN', 'PyMES', 'B3'),
('8456289002', 'Interchange', 'Cambridge', 'Inglés', 'B3'),
('8456382021', 'De las palabras a los hechos', 'Tirant', 'PyMES', 'C3'),
('8456782901', 'Wind energy', 'CRC Press', 'Energía', 'C2'),
('8457802148', 'Ciencia ambiental preservemos la tierra', 'Thomson Learning', 'Ambiental', 'A2'),
('8462198312', 'Fundamentos de ecología', 'Cengage', 'Ambiental', 'C2'),
('8463557901', 'Oleohidráulica básica', 'Alfaomega', 'Energía', 'B3'),
('8463737290', 'English grammar in use', 'Cambridge', 'Inglés', 'C1'),
('8466528152', 'Face2Face', 'Cambridge', 'Inglés', 'A3'),
('8467289011', 'Teoría de autómatas, lenguajes y computación', 'Pearson', 'Software', 'B3'),
('8467289122', 'World view 2', 'Longman', 'Inglés', 'B1'),
('8467299100', 'Ética', 'IPN', 'PyMES', 'A2'),
('8467381923', 'Know how', 'Oxford', 'Inglés', 'A1'),
('8467829129', 'Photovoltaic systems engineering', 'CRC Press', 'Energía', 'A2'),
('8469101189', 'How to teach writting', 'Longman', 'Inglés', 'A2'),
('8469696912', 'Fundamentos generales de programación', 'MC Hill', 'Software', 'A1'),
('8471891469', 'Agenda ecológica federal', 'ISEF', 'Ambiental', 'A1'),
('8473789190', 'Reading keys', 'Macmillan', 'Inglés', 'B3'),
('8477200399', 'Energías e impacto ambiental', 'Milenium', 'Ambiental', 'A4'),
('8477212345', 'La enseñanza como puente a la vida', 'IPN', 'PyMES', 'C2'),
('8478200012', 'Economía del medio ambiente', 'Alfaomega', 'Ambiental', 'A1'),
('8478289921', 'Ingeniería del software', 'MC Hill', 'Software', 'A1'),
('8478290982', 'Tratado de climatología aplicada', 'Mundi-Prensa', 'Ambiental', 'B3'),
('8478292010', 'Energy conservation guidebook', 'ISBN', 'Energía', 'A1'),
('8478371929', 'Ecología y medio ambiente', 'Pearson', 'Ambiental', 'B3'),
('8479083492', 'Banco central y tasas de interés', 'IPN', 'PyMES', 'B1'),
('8479802092', 'Curso de energía solar', 'ISBN', 'Energía', 'B1'),
('8482892902', 'Contabilidad', 'IPN', 'PyMES', 'A2'),
('8482911091', 'Hydrogen fuel', 'CRC Press', 'Energía', 'A2'),
('8483982947', 'Dispersión de contaminantes en la atmosfera', 'Alfaomega', 'Ambiental', 'C2'),
('8487890212', 'La presidencia interina de Victoriano Huerta', 'IPN', 'PyMES', 'A3'),
('8489391002', 'Simple solutions to energy calculations', 'CRC Press', 'Energía', 'C2'),
('8493012309', 'Energía solar fotovoltaica', 'Marcombo', 'Energía', 'C3'),
('8493909100', 'Objetive pet', 'Cambridge', 'Inglés', 'C2'),
('8499209899', 'Estructura de datos con C++', 'MC Hill', 'Software', 'B2'),
('8499838781', 'Enterprise 1', 'Express', 'Inglés', 'C1'),
('8499928211', 'Derechos de los usuarios de los servicios de salud', 'IPN', 'PyMES', 'A1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `correo` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `contrasena` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `permiso` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `imagen` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `correo`, `contrasena`, `permiso`, `nombre`, `imagen`) VALUES
('admin', 'carmonabernaldiego@gmail.com', 'root', 'admin', 'Diego Carmona Bernal', 'admin788.png'),
('hiram', 'hiram@gmail.com', 'hiram', 'admin', 'Hiram Culebro', 'admin-eb405861.png'),
('key', 'key@gmail.com', 'key123', 'admin', 'Keyla Sosa', 'key.jpeg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`ISBN`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`),
  ADD UNIQUE KEY `email` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
