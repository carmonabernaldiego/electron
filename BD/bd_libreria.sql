-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-07-2022 a las 16:18:16
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
  `nombre` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `editorial` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `carrera` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `ubicacion` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`ISBN`, `nombre`, `editorial`, `carrera`, `ubicacion`) VALUES
('8401921015', 'Compiladores', 'PEARSON ', 'Software', 'B2'),
('8402086969', 'Como programar en c++', 'DEITEL', 'Software', 'A4'),
('8403083910', 'Ecological restoration', 'ISLANDPRESS', 'Ambiental', 'D2'),
('8412123101', 'Advanced grammar in use', 'CAMBRIDGE', 'Inglés', 'A2'),
('8412340082', 'Energía mediante vapor, aire o gas', 'REVERTE', 'Energía', 'B3'),
('8420617040', 'Análisis y diseño de algoritmos', 'ALFAOMEGA', 'Software', 'A3'),
('8421348901', 'Nociones de derecho civil y mercantil', 'IPN', 'PyMES', 'B1'),
('8421349800', 'Manual de climatización', 'ISBN', 'Ambiental', 'C1'),
('8422621282', 'Antología personal', 'DINAMO', 'PyMES', 'C2'),
('8428930012', 'Ingeniería de software', 'SOMMERVILLE', 'Software', 'C2'),
('8430504737', 'Alternative energy systems', 'CRC PRESS', 'Energía', 'A1'),
('8437283781', 'Diseños experimentales', 'TRILLAS', 'Software', 'C4'),
('8453561911', 'Introduction to java programming', 'PEARSON', 'Software', 'C4'),
('8456278901', 'Derechos del consumidor', 'IPN', 'PyMES', 'B3'),
('8456289002', 'Interchange', 'CAMBRIDGE', 'Inglés', 'B3'),
('8456382021', 'De las palabras a los hechos', 'TIRANT', 'PyMES', 'C3'),
('8456782901', 'Wind energy', 'CRC PRESS', 'Energía', 'C2'),
('8457802148', 'Ciencia ambiental preservemos la tierra', 'THOMSON LEARNING', 'Ambiental', 'A2'),
('8462198312', 'Fundamentos de ecología', 'CENGAGE', 'Ambiental', 'C2'),
('8463557901', 'Oleohidráulica básica', 'ALFAOMEGA', 'Energía', 'B3'),
('8463737290', 'English grammar in use', 'CAMBRIDGE', 'Inglés', 'C1'),
('8466528152', 'Face2Face', 'CAMBRIDGE', 'Inglés', 'A3'),
('8467289011', 'Teoría de autómatas, lenguajes y computación', 'PEARSON', 'Software', 'B3'),
('8467289122', 'World view 2', 'LONGMAN', 'Inglés', 'B1'),
('8467299100', 'Ética', 'IPN', 'PyMES', 'A2'),
('8467381923', 'Know how', 'OXFORD', 'Inglés', 'A1'),
('8467829129', 'Photovoltaic systems engineering', 'CRC PRESS', 'Energía', 'A2'),
('8469101189', 'How to teach writting', 'LONGMAN', 'Inglés', 'A2'),
('8469696912', 'Fundamentos generales de programación', 'MC HILL', 'Software', 'A1'),
('8471891469', 'Agenda ecológica federal', 'ISEF', 'Ambiental', 'A1'),
('8473789190', 'Reading keys', 'MACMILLAN', 'Inglés', 'B3'),
('8477200399', 'Energías e impacto ambiental', 'MILENIUM', 'Ambiental', 'A4'),
('8477212345', 'La enseñanza como puente a la vida', 'IPN', 'PyMES', 'C2'),
('8478200012', 'Economía del medio ambiente', 'ALFAOMEGA', 'Ambiental', 'A1'),
('8478289921', 'Ingeniería del software', 'MC HILL', 'Software', 'A1'),
('8478290982', 'Tratado de climatología aplicada', 'MUNDI-PRENSA', 'Ambiental', 'B3'),
('8478292010', 'Energy conservation guidebook', 'ISBN', 'Energía', 'A1'),
('8478371929', 'Ecología y medio ambiente', 'PEARSON', 'Ambiental', 'B3'),
('8479083492', 'Banco central y tasas de interés', 'IPN', 'PyMES', 'B1'),
('8479802092', 'Curso de energía solar', 'ISBN', 'Energía', 'B1'),
('8482892902', 'Contabilidad', 'IPN', 'PyMES', 'A2'),
('8482911091', 'Hydrogen fuel', 'CRC PRESS', 'Energía', 'A2'),
('8483982947', 'Dispersión de contaminantes en la atmosfera', 'ALFAOMEGA', 'Ambiental', 'C2'),
('8487890212', 'La presidencia interina de Victoriano Huerta', 'IPN', 'PyMES', 'A3'),
('8489391002', 'Simple solutions to energy calculations', 'CRC PRESS', 'Energía', 'C2'),
('8493012309', 'Energía solar fotovoltaica', 'MARCOMBO', 'Energía', 'C3'),
('8493909100', 'Objetive pet', 'CAMBRIDGE', 'Inglés', 'C2'),
('8499209899', 'Estructura de datos con C++', 'MC HILL', 'Software', 'B2'),
('8499838781', 'Enterprise 1', 'EXPRESS', 'Inglés', 'C1'),
('8499928211', 'Derechos de los usuarios de los servicios de salud', 'IPN', 'PyMES', 'A1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `pass` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `permissions` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `name` varchar(90) COLLATE utf8_spanish2_ci NOT NULL,
  `image` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `email`, `pass`, `permissions`, `name`, `image`, `created_at`, `updated_at`) VALUES
('admin', 'carmonabernaldiego@gmail.com', 'root', 'admin', 'Diego Carmona Bernal', 'admin788.png', '2021-12-05 18:27:39', NULL),
('editor', 'editor@gmail.com', 'editor', 'admin', 'Jesús Antonio Olvera Gálvez', 'editor520.png', '2021-05-01 00:00:00', NULL),
('hiram', 'hiram@gmail.com', 'root', 'admin', 'Hiram Culebro', 'admin-eb405861.png', '2022-06-27 18:51:09', NULL);

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
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
