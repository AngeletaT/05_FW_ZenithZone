-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 19:25:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zenithzone`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateLikes` (IN `p_user_name` VARCHAR(20), IN `p_code_prop` INT)   BEGIN
    DECLARE v_exists INT;

    SELECT COUNT(*) INTO v_exists
    FROM likes
    WHERE username = p_user_name AND code_prop = p_code_prop;

    IF v_exists = 0 THEN
        INSERT INTO likes(username, code_prop)
        VALUES (p_user_name, p_code_prop);

        UPDATE property
        SET likes = likes + 1
        WHERE code_prop = p_code_prop;
    ELSE
        DELETE FROM likes
        WHERE username = p_user_name AND code_prop = p_code_prop;

        UPDATE property
        SET likes = likes - 1
        WHERE code_prop = p_code_prop;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `code_act` int(11) NOT NULL,
  `name_act` varchar(255) DEFAULT NULL,
  `img_act` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`code_act`, `name_act`, `img_act`) VALUES
(1, 'Ballet', 'view/img/activity/act_ballet.webp'),
(2, 'HipHop', 'view/img/activity/act_hip.webp'),
(3, 'Pilates', 'view/img/activity/act_pilates.webp'),
(4, 'Salon', 'view/img/activity/act_salon.webp'),
(5, 'Yoga', 'view/img/activity/act_yoga.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `id_prod` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `code_cat` int(11) NOT NULL,
  `name_cat` varchar(255) DEFAULT NULL,
  `img_cat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`code_cat`, `name_cat`, `img_cat`) VALUES
(1, 'FOR SALE', 'view/img/category/cat_sale.png'),
(2, 'FOR RENT', 'view/img/category/cat_rent.png'),
(3, 'FOR SHARE', 'view/img/category/cat_share.png'),
(4, 'A ROOM', 'view/img/category/cat_room.png'),
(5, 'NEW BUILD', 'view/img/category/cat_new.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `code_city` int(11) NOT NULL,
  `name_city` varchar(255) DEFAULT NULL,
  `img_city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`code_city`, `name_city`, `img_city`) VALUES
(1, 'Valencia', 'view/img/city/city_valencia.webp'),
(2, 'Alicante', 'view/img/city/city_alicante.webp'),
(3, 'Madrid', 'view/img/city/city_madrid.webp'),
(4, 'Barcelona', 'view/img/city/city_barcelona.webp'),
(5, 'Sevilla', 'view/img/city/city_sevilla.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `place` varchar(100) NOT NULL,
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extra`
--

CREATE TABLE `extra` (
  `code_extra` int(11) NOT NULL,
  `name_extra` varchar(255) DEFAULT NULL,
  `img_extra` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `extra`
--

INSERT INTO `extra` (`code_extra`, `name_extra`, `img_extra`) VALUES
(1, 'Pool', 'view/img/extra/extra_pool.webp'),
(2, 'Garden', 'view/img/extra/extra_garden.webp'),
(3, 'Terrace', 'view/img/extra/extra_terrace.webp'),
(4, 'Balcony', 'view/img/extra/extra_balcony.webp'),
(5, 'Storage', 'view/img/extra/extra_storage.webp'),
(6, 'Empty', 'view/img/extra/extra_empty.webp'),
(7, 'Furnished', 'view/img/extra/extra_furnished.webp'),
(8, 'Parking', 'view/img/extra/extra_parking.webp'),
(9, 'Lift', 'view/img/extra/extra_lift.webp'),
(10, 'Heating', 'view/img/extra/extra_heating.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `code_img` int(11) NOT NULL,
  `code_prop` int(11) DEFAULT NULL,
  `img_prop` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`code_img`, `code_prop`, `img_prop`) VALUES
(1, 1, 'view/img/property/prop1.1.webp'),
(2, 1, 'view/img/property/prop1.2.webp'),
(3, 1, 'view/img/property/prop1.3.webp'),
(4, 1, 'view/img/property/prop1.4.webp'),
(5, 1, 'view/img/property/prop1.5.webp'),
(6, 2, 'view/img/property/prop2.1.webp'),
(7, 2, 'view/img/property/prop2.2.webp'),
(8, 2, 'view/img/property/prop2.3.webp'),
(9, 2, 'view/img/property/prop2.4.webp'),
(10, 2, 'view/img/property/prop2.5.webp'),
(11, 3, 'view/img/property/prop3.1.webp'),
(12, 3, 'view/img/property/prop3.2.webp'),
(13, 3, 'view/img/property/prop3.3.webp'),
(14, 3, 'view/img/property/prop3.4.webp'),
(15, 3, 'view/img/property/prop3.5.webp'),
(16, 4, 'view/img/property/prop4.1.webp'),
(17, 4, 'view/img/property/prop4.2.webp'),
(18, 4, 'view/img/property/prop4.3.webp'),
(19, 4, 'view/img/property/prop4.4.webp'),
(20, 4, 'view/img/property/prop4.5.webp'),
(21, 5, 'view/img/property/prop5.1.webp'),
(22, 5, 'view/img/property/prop5.2.webp'),
(23, 5, 'view/img/property/prop5.3.webp'),
(24, 5, 'view/img/property/prop5.4.webp'),
(25, 5, 'view/img/property/prop5.5.webp'),
(26, 6, 'view/img/property/prop6.1.webp'),
(27, 6, 'view/img/property/prop6.2.webp'),
(28, 6, 'view/img/property/prop6.3.webp'),
(29, 6, 'view/img/property/prop6.4.webp'),
(30, 6, 'view/img/property/prop6.5.webp'),
(31, 7, 'view/img/property/prop7.1.webp'),
(32, 7, 'view/img/property/prop7.2.webp'),
(33, 7, 'view/img/property/prop7.3.webp'),
(34, 7, 'view/img/property/prop7.4.webp'),
(35, 7, 'view/img/property/prop7.5.webp'),
(36, 8, 'view/img/property/prop8.1.webp'),
(37, 8, 'view/img/property/prop8.2.webp'),
(38, 8, 'view/img/property/prop8.3.webp'),
(39, 8, 'view/img/property/prop8.4.webp'),
(40, 8, 'view/img/property/prop8.5.webp'),
(41, 9, 'view/img/property/prop9.1.webp'),
(42, 9, 'view/img/property/prop9.2.webp'),
(43, 9, 'view/img/property/prop9.3.webp'),
(44, 9, 'view/img/property/prop9.4.webp'),
(45, 9, 'view/img/property/prop9.5.webp'),
(46, 10, 'view/img/property/prop10.1.webp'),
(47, 10, 'view/img/property/prop10.2.webp'),
(48, 10, 'view/img/property/prop10.3.webp'),
(49, 10, 'view/img/property/prop10.4.webp'),
(50, 10, 'view/img/property/prop10.5.webp'),
(51, 11, 'view/img/property/prop11.1.webp'),
(52, 11, 'view/img/property/prop11.2.webp'),
(53, 11, 'view/img/property/prop11.3.webp'),
(54, 11, 'view/img/property/prop11.4.webp'),
(55, 11, 'view/img/property/prop11.5.webp'),
(56, 12, 'view/img/property/prop12.1.webp'),
(57, 12, 'view/img/property/prop12.2.webp'),
(58, 12, 'view/img/property/prop12.3.webp'),
(59, 12, 'view/img/property/prop12.4.webp'),
(60, 12, 'view/img/property/prop12.5.webp'),
(61, 13, 'view/img/property/prop13.1.webp'),
(62, 13, 'view/img/property/prop13.2.webp'),
(63, 13, 'view/img/property/prop13.3.webp'),
(64, 13, 'view/img/property/prop13.4.webp'),
(65, 13, 'view/img/property/prop13.5.webp'),
(66, 14, 'view/img/property/prop14.1.webp'),
(67, 14, 'view/img/property/prop14.2.webp'),
(68, 14, 'view/img/property/prop14.3.webp'),
(69, 14, 'view/img/property/prop14.4.webp'),
(70, 14, 'view/img/property/prop14.5.webp'),
(71, 15, 'view/img/property/prop15.1.webp'),
(72, 15, 'view/img/property/prop15.2.webp'),
(73, 15, 'view/img/property/prop15.3.webp'),
(74, 15, 'view/img/property/prop15.4.webp'),
(75, 15, 'view/img/property/prop15.5.webp'),
(76, 16, 'view/img/property/prop16.1.webp'),
(77, 16, 'view/img/property/prop16.2.webp'),
(78, 16, 'view/img/property/prop16.3.webp'),
(79, 16, 'view/img/property/prop16.4.webp'),
(80, 16, 'view/img/property/prop16.5.webp'),
(81, 17, 'view/img/property/prop17.1.webp'),
(82, 17, 'view/img/property/prop17.2.webp'),
(83, 17, 'view/img/property/prop17.3.webp'),
(84, 17, 'view/img/property/prop17.4.webp'),
(85, 17, 'view/img/property/prop17.5.webp'),
(86, 18, 'view/img/property/prop18.1.webp'),
(87, 18, 'view/img/property/prop18.2.webp'),
(88, 18, 'view/img/property/prop18.3.webp'),
(89, 18, 'view/img/property/prop18.4.webp'),
(90, 18, 'view/img/property/prop18.5.webp'),
(91, 19, 'view/img/property/prop19.1.webp'),
(92, 19, 'view/img/property/prop19.2.webp'),
(93, 19, 'view/img/property/prop19.3.webp'),
(94, 19, 'view/img/property/prop19.4.webp'),
(95, 19, 'view/img/property/prop19.5.webp'),
(96, 20, 'view/img/property/prop20.1.webp'),
(97, 20, 'view/img/property/prop20.2.webp'),
(98, 20, 'view/img/property/prop20.3.webp'),
(99, 20, 'view/img/property/prop20.4.webp'),
(100, 20, 'view/img/property/prop20.5.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `username` varchar(20) NOT NULL,
  `code_prop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`username`, `code_prop`) VALUES
('Cain33', 2),
('Cain33', 4),
('Cain33', 5),
('Salva32', 1),
('Salva32', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_prod` int(11) NOT NULL,
  `name_prod` varchar(255) NOT NULL,
  `price_prod` int(255) NOT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_prod`, `name_prod`, `price_prod`, `stock`) VALUES
(1, 'Clases de Ballet', 20, 100),
(2, 'Clases de Hip Hop', 20, 100),
(3, 'Clases de Pilates', 20, 100),
(4, 'Clases de Bailes de Salón', 25, 100),
(5, 'Clases de Yoga', 25, 100),
(6, 'Membresía de gimnasio', 50, 100),
(7, 'Entrenador personal a domicilio', 60, 100),
(8, 'Equipo de deporte en casa', 200, 100),
(9, 'Instalación de vigilancia', 100, 150),
(10, 'Instalación de internet', 75, 100),
(11, 'Servicios de Streaming', 10, 100),
(12, 'Mudanza', 100, 100),
(13, 'Servicio de reparaciones', 50, 100),
(14, 'Servicio de limpieza', 25, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property`
--

CREATE TABLE `property` (
  `code_prop` int(11) NOT NULL,
  `ref_cat` varchar(255) DEFAULT NULL,
  `name_prop` varchar(255) DEFAULT NULL,
  `m2` int(11) DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `baths` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `price` int(25) DEFAULT NULL,
  `publication` date DEFAULT NULL,
  `code_city` int(11) DEFAULT NULL,
  `longitud` float NOT NULL,
  `latitud` float NOT NULL,
  `last_visit` datetime DEFAULT NULL,
  `likes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property`
--

INSERT INTO `property` (`code_prop`, `ref_cat`, `name_prop`, `m2`, `rooms`, `baths`, `description`, `price`, `publication`, `code_city`, `longitud`, `latitud`, `last_visit`, `likes`) VALUES
(1, '1235A', 'Spacious house with garden', 200, 4, 2, 'Enjoy the spaciousness of this 200m² house with 4 bedrooms and 2 baths, complemented by a serene garden, offering a perfect blend of comfort and tranquility', 300000, '2024-01-25', 1, -0.4063, 39.4946, '2024-05-29 19:24:31', 2),
(2, '4567B', 'Cozy flat in the city center', 100, 2, 1, 'Nestled in the city center, this cozy 100m² flat boasts 2 bedrooms and 1 bath, promising urban convenience combined with warmth and charm.', 150000, '2024-01-25', 5, -5.9821, 37.3886, '2024-05-29 19:23:56', 2),
(3, '8912C', 'Beautiful house with a view', 180, 3, 2, 'Revel in the beauty of this 180m² house, featuring 3 bedrooms and 2 baths, offering picturesque views that redefine the concept of home.', 250000, '2024-01-25', 2, -0.4838, 38.3452, '2024-04-19 19:09:03', 0),
(4, '3456D', 'Large commercial space', 300, 0, 1, 'Embark on vast commercial ventures with this 300m² property, designed for expansive enterprises, promising ample space for your business aspirations.', 500000, '2024-01-25', 4, 2.1685, 41.3851, '2024-03-25 20:57:28', 1),
(5, '6789E\r\n', 'Spacious land for development', 500, 0, 0, 'Unleash your development dreams on this 500m² expanse of land, offering endless possibilities and a canvas for your visionary projects.', 100000, '2024-01-25', 1, -0.3847, 39.5122, '2024-04-24 21:10:47', 1),
(6, '5896F', 'Modern house with swimming pool', 220, 5, 3, 'Step into modern luxury with this 220m² house, boasting 5 bedrooms, 3 baths, and a refreshing swimming pool, promising an epitome of contemporary living.', 350000, '2024-01-25', 2, -0.5068, 38.3498, '2024-04-24 21:11:24', 1),
(7, '1246G', 'Bright flat with balcony', 120, 2, 1, 'Illuminate your life in this bright 120m² flat, featuring 2 bedrooms and 1 bath, complemented by a charming balcony, offering a delightful urban retreat.', 180000, '2024-01-25', 3, -3.7038, 40.4168, NULL, 0),
(8, '5789H', 'Commercial property with parking', 400, 0, 1, 'Unlock the potential of your business in this 400m² property, equipped with parking facilities, offering a strategic location for your commercial endeavors.', 600000, '2024-01-25', 4, 2.2049, 41.4168, NULL, 0),
(9, '6485J', 'Spacious garage for multiple cars', 10, 0, 0, 'Safeguard your vehicles in this spacious 10m² garage, providing ample room for multiple cars, ensuring convenience and security for your prized possessions.', 25000, '2024-01-25', 5, -5.9651, 37.3814, '2024-04-19 20:01:11', 0),
(10, 'ABC123', 'Modern Apartment with Sea View', 110, 3, 2, 'This modern apartment offers stunning sea views, with 3 bedrooms and 2 bathrooms, perfect for those seeking a coastal lifestyle.', 250000, '2024-04-19', 1, -0.4015, 39.4737, '2024-04-19 19:51:00', 0),
(11, 'DEF456', 'Charming Villa with Pool', 250, 5, 3, 'Experience the charm of this villa with a private pool, featuring 5 bedrooms and 3 bathrooms, ideal for relaxation and entertainment.', 450000, '2024-04-19', 2, -0.4986, 38.3456, NULL, 0),
(12, 'GHI789', 'Spacious Loft in the City', 150, 1, 1, 'This spacious loft in the heart of the city offers a unique living experience, with 1 bedroom and 1 bathroom, perfect for urban dwellers.', 180000, '2024-04-19', 3, -3.7025, 40.4144, NULL, 0),
(13, 'JKL012', 'Luxury Penthouse with Terrace', 180, 4, 2, 'Indulge in luxury living with this penthouse boasting a spacious terrace, 4 bedrooms, and 2 bathrooms, offering panoramic city views.', 700000, '2024-04-19', 4, 2.1781, 41.3948, NULL, 0),
(14, 'MNO345', 'Cozy Cottage in the Countryside', 120, 2, 1, 'Escape to the countryside in this cozy cottage, featuring 2 bedrooms and 1 bathroom, offering tranquility and nature just outside your door.', 120000, '2024-04-19', 5, -6.0123, 37.3971, NULL, 0),
(15, 'PQR678', 'Commercial Space in Business District', 400, 0, 2, 'Invest in this commercial space located in the bustling business district, offering 400m² of opportunity for your entrepreneurial ventures.', 800000, '2024-04-19', 1, -0.4072, 39.4891, NULL, 0),
(16, 'STU901', 'Renovated Townhouse with Garden', 180, 3, 2, 'Discover the charm of this renovated townhouse with a beautiful garden, featuring 3 bedrooms and 2 bathrooms, perfect for family living.', 320000, '2024-04-19', 2, -0.4903, 38.3558, NULL, 0),
(17, 'VWX234', 'Industrial Warehouse with Office', 600, 0, 0, 'Unlock the potential of this industrial warehouse with an attached office space, offering 600m² of space for your business needs.', 550000, '2024-04-19', 3, -3.7045, 40.4158, NULL, 0),
(18, 'YZA567', 'Rustic Farmhouse with Vineyard', 300, 4, 3, 'Experience rustic living in this farmhouse surrounded by vineyards, boasting 4 bedrooms and 3 bathrooms, perfect for wine enthusiasts.', 400000, '2024-04-19', 4, 2.1859, 41.3845, NULL, 0),
(19, 'BCD890', 'Secluded Retreat in the Mountains', 200, 3, 2, 'Escape to this secluded retreat nestled in the mountains, offering 3 bedrooms and 2 bathrooms, ideal for those seeking serenity and nature.', 280000, '2024-04-19', 5, -6.0021, 37.4035, NULL, 0),
(20, 'EFG123', 'Elegant Townhouse with Rooftop Terrace', 160, 3, 2, 'Step into elegance with this townhouse featuring a rooftop terrace, 3 bedrooms, and 2 bathrooms, offering sophistication and style.', 380000, '2024-04-19', 1, -0.4138, 39.4982, '2024-05-09 23:16:43', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_product`
--

CREATE TABLE `property_product` (
  `code_prop` int(11) NOT NULL,
  `code_prod` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_product`
--

INSERT INTO `property_product` (`code_prop`, `code_prod`) VALUES
(1,1), 
(6,1),
(11,1),
(16,1),
(2,2),
(7,2),
(12,2),
(17,2),
(3,3),
(8,3),
(13,3),
(18,3),
(4,4),
(9,4),
(14,4),
(19,4),
(5,5),
(10,5),
(15,5),
(20,5),
(1,6),
(2,6),
(3,6),
(4,6),
(5,6),
(6,6),
(7,6),
(8,6),
(9,6),
(10,6),
(11,6),
(12,6),
(13,6),
(14,6),
(15,6),
(16,6),
(17,6),
(18,6),
(19,6),
(20,6),
(2,7),
(7,7),
(11,7),
(15,7),
(19,7),
(1,8),
(3,8),
(6,8),
(10,8),
(14,8),
(18,8),
(1,9),
(2,9),
(3,9),
(4,9),
(6,9),
(7,9),
(8,9),
(10,9),
(11,9),
(12,9),
(14,9),
(15,9),
(16,9),
(18,9),
(19,9),
(20,9),
(1,10),
(2,10),
(3,10),
(4,10),
(6,10),
(7,10),
(8,10),
(10,10),
(11,10),
(12,10),
(14,10),
(15,10),
(16,10),
(18,10),
(19,10),
(20,10),
(1,11),
(3,11),
(6,11),
(10,11),
(14,11),
(18,11),
(2,11),
(7,11),
(11,11),
(15,11),
(19,11),
(1,12),
(2,12),
(3,12),
(6,12),
(10,12),
(14,12),
(18,12),
(7,12),
(11,12),
(15,12),
(19,12),
(2,13),
(7,13),
(11,13),
(15,13),
(19,13),
(4,13),
(8,13),
(12,13),
(16,13),
(20,13),
(5,13),
(13,13),
(17,13),
(4,14),
(8,14),
(12,14),
(16,14),
(20,14);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_activity`
--

CREATE TABLE `property_activity` (
  `code_prop` int(11) NOT NULL,
  `code_act` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_activity`
--

INSERT INTO `property_activity` (`code_prop`, `code_act`) VALUES
(1, 1), -- Spacious house with garden -> Ballet
(2, 2), -- Cozy flat in the city center -> HipHop
(3, 3), -- Beautiful house with a view -> Pilates
(4, 4), -- Large commercial space -> Salon
(5, 5), -- Spacious land for development -> Yoga
(6, 1), -- Modern house with swimming pool -> Ballet
(7, 2), -- Bright flat with balcony -> HipHop
(8, 3), -- Commercial property with parking -> Pilates
(9, 5), -- Spacious garage for multiple cars -> Yoga
(10, 1), -- Modern Apartment with Sea View -> Ballet
(11, 2), -- Charming Villa with Pool -> HipHop
(12, 3), -- Spacious Loft in the City -> Pilates
(13, 4), -- Luxury Penthouse with Terrace -> Salon
(14, 5), -- Cozy Cottage in the Countryside -> Yoga
(15, 1), -- Commercial Space in Business District -> Ballet
(16, 2), -- Renovated Townhouse with Garden -> HipHop
(17, 3), -- Industrial Warehouse with Office -> Pilates
(18, 4), -- Rustic Farmhouse with Vineyard -> Salon
(19, 5), -- Secluded Retreat in the Mountains -> Yoga
(20, 1); -- Elegant Townhouse with Rooftop Terrace -> Ballet


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_category`
--

CREATE TABLE `property_category` (
  `code_prop` int(11) NOT NULL,
  `code_cat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_category`
--

INSERT INTO `property_category` (`code_prop`, `code_cat`) VALUES
(1, 1), -- Spacious house with garden -> FOR SALE
(2, 2), -- Cozy flat in the city center -> FOR RENT
(3, 1), -- Beautiful house with a view -> FOR SALE
(4, 3), -- Large commercial space -> FOR SHARE
(5, 4), -- Spacious land for development -> A ROOM
(6, 1), -- Modern house with swimming pool -> FOR SALE
(7, 2), -- Bright flat with balcony -> FOR RENT
(8, 3), -- Commercial property with parking -> FOR SHARE
(9, 5), -- Spacious garage for multiple cars -> NEW BUILD
(10, 1), -- Modern Apartment with Sea View -> FOR SALE
(11, 2), -- Charming Villa with Pool -> FOR RENT
(12, 3), -- Spacious Loft in the City -> FOR SHARE
(13, 4), -- Luxury Penthouse with Terrace -> A ROOM
(14, 1), -- Cozy Cottage in the Countryside -> FOR SALE
(15, 2), -- Commercial Space in Business District -> FOR RENT
(16, 3), -- Renovated Townhouse with Garden -> FOR SHARE
(17, 4), -- Industrial Warehouse with Office -> A ROOM
(18, 1), -- Rustic Farmhouse with Vineyard -> FOR SALE
(19, 2), -- Secluded Retreat in the Mountains -> FOR RENT
(20, 3); -- Elegant Townhouse with Rooftop Terrace -> FOR SHARE

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_extras`
--

CREATE TABLE `property_extras` (
  `code_prop` int(11) NOT NULL,
  `code_extra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_extras`
--

INSERT INTO `property_extras` (`code_prop`, `code_extra`) VALUES
(1, 2), -- Spacious house with garden -> Garden
(2, 7), -- Cozy flat in the city center -> Furnished
(3, 3), -- Beautiful house with a view -> Terrace
(4, 8), -- Large commercial space -> Parking
(5, 6), -- Spacious land for development -> Empty
(6, 1), -- Modern house with swimming pool -> Pool
(7, 4), -- Bright flat with balcony -> Balcony
(8, 8), -- Commercial property with parking -> Parking
(9, 8), -- Spacious garage for multiple cars -> Parking
(10, 3), -- Modern Apartment with Sea View -> Terrace
(11, 1), -- Charming Villa with Pool -> Pool
(12, 6), -- Spacious Loft in the City -> Empty
(13, 3), -- Luxury Penthouse with Terrace -> Terrace
(14, 2), -- Cozy Cottage in the Countryside -> Garden
(15, 8), -- Commercial Space in Business District -> Parking
(16, 2), -- Renovated Townhouse with Garden -> Garden
(17, 8), -- Industrial Warehouse with Office -> Parking
(18, 2), -- Rustic Farmhouse with Vineyard -> Garden
(19, 2), -- Secluded Retreat in the Mountains -> Garden
(20, 3); -- Elegant Townhouse with Rooftop Terrace -> Terrace

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_type`
--

CREATE TABLE `property_type` (
  `code_prop` int(11) NOT NULL,
  `code_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_type`
--

INSERT INTO `property_type` (`code_prop`, `code_type`) VALUES
(1, 1), -- Spacious house with garden -> House
(2, 2), -- Cozy flat in the city center -> Flat
(3, 1), -- Beautiful house with a view -> House
(4, 3), -- Large commercial space -> Business
(5, 4), -- Spacious land for development -> Terrain
(6, 1), -- Modern house with swimming pool -> House
(7, 2), -- Bright flat with balcony -> Flat
(8, 3), -- Commercial property with parking -> Business
(9, 5), -- Spacious garage for multiple cars -> Garage
(10, 2), -- Modern Apartment with Sea View -> Flat
(11, 1), -- Charming Villa with Pool -> House
(12, 2), -- Spacious Loft in the City -> Flat
(13, 3), -- Luxury Penthouse with Terrace -> Business
(14, 1), -- Cozy Cottage in the Countryside -> House
(15, 2), -- Commercial Space in Business District -> Flat
(16, 3), -- Renovated Townhouse with Garden -> Business
(17, 4), -- Industrial Warehouse with Office -> Terrain
(18, 1), -- Rustic Farmhouse with Vineyard -> House
(19, 2), -- Secluded Retreat in the Mountains -> Flat
(20, 3); -- Elegant Townhouse with Rooftop Terrace -> Business


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `id_purchase` int(11) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `id_prod` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `date_purchase` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE `type` (
  `code_type` int(11) NOT NULL,
  `name_type` varchar(255) DEFAULT NULL,
  `img_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`code_type`, `name_type`, `img_type`) VALUES
(1, 'House', 'view/img/type/type_house.webp'),
(2, 'Flat', 'view/img/type/type_flat.webp'),
(3, 'Business', 'view/img/type/type_business.webp'),
(4, 'Terrain', 'view/img/type/type_terrain.webp'),
(5, 'Garage', 'view/img/type/type_garage.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` varchar(100) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `login_attempts` int(11) NOT NULL,
  `token_email` varchar(1000) NOT NULL,
  `token_otp` varchar(20) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `login_type` enum('local','google','github') NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `phone_number`, `login_attempts`, `token_email`, `token_otp`, `isActive`, `login_type`) VALUES
('0069a', 'Salva32', '$2y$12$HuhpFdE6TZ6R4dSixiYwLOoqU9YIhyk/Vpqguu0wlpBnGBvcASQmS', 'salva32@gmail.com', 'client', 'https://i.pravatar.cc/500?u=3f7c577fb8d1d26e0bccaa5efb593184', '', 0, '', '', 1, 'local'),
('1044v', 'Juan29', '$2y$12$dbwGopIYSRfpSu5qRkF.3uLq1kQUxSMmVbjUBSdJqGjJOr.hhaxfi', 'juan29@gmail.com', 'client', 'https://i.pravatar.cc/500?u=7038663cc684aa330956752c7e6fe7d4', '', 0, '', '', 1, 'local'),
('1316a', 'guille14', '$2y$12$9KQBpg8Tf33dNN174kNnnOdPeb/vhFT4sVmSfL68pqcIn4L4lPZ8i', 'guille14@gmail.com', 'client', 'https://i.pravatar.cc/500?u=ade40bb1a8734c244cb961d1f5287582', '', 0, '', '', 1, 'local'),
('2i9GDBf7SSdb0i06kTcKTYqRIvQ2', 'angeletatb98', '', 'angeletatb98@gmail.com', 'client', 'https://avatars.githubusercontent.com/u/170969127?v=4', '', 0, '', '', 0, 'github'),
('471ca', 'Laura56', '$2y$12$nyJ1WKnz9yw3HdCNOxAIK.yWg5DbL8nn4bfchol1iW8/c05zRcp/m', 'laura56@gmail.com', 'client', 'https://i.pravatar.cc/500?u=f6a5735eb29501cce7904c2894432542', '', 0, '', '', 1, 'local'),
('6bdb7', 'paco79', '$2y$12$7kAiWI6IcjtNcXSBESSaneZfId8KqvfVkxbk9G/uvpwvyZKyUz9bq', 'paco79@gmail.com', 'client', 'https://i.pravatar.cc/500?u=cd03520894abd001149c0ad0491c1d04', '', 0, '', '', 1, 'local'),
('8dcb4', 'Cain33', '$2y$12$1i399bzacg67obsHMuNSZeYBZ/f5/Kvet23tn3OdWWYu/RIQVwzvO', 'cain33@gmail.com', 'client', 'https://i.pravatar.cc/500?u=3bb21b792c59e0c1d535902d3ea213e1', '', 0, '', '', 1, 'local'),
('9d8df', 'Angela24', '$2y$12$qjen7QF.pQ4S6CLAR/WzuuuI1uvhSTpnK.lpNnaq0VUsX0EKKRXQi', 'angela24@gmail.com', 'admin', 'https://robohash.org/bcad65cbb7e72b2c3eb99b8f4a4d41ee', '', 0, '', '', 1, 'local'),
('b0a0j', 'Alvaro74', '$2y$12$9Yl2wNh5hjRJr2c2SaNDkuW54avtOPyX6A3j08i61WZGcAYIlFT6u', 'alvaro74@gmail.com', 'client', 'https://i.pravatar.cc/500?u=438ae20f700cb35f02b4dc03e80c07e6', '+345687466', 0, '', '', 1, 'local'),
('c9c15', 'Carla29 ', '$2y$12$ArMAmb7UPHEbzxo9so1BWOSjCzgBhqL0TtgzZJgmmy42q7UuJi4LO', 'carla29@gmail.com', 'client', 'https://i.pravatar.cc/400?u=62779a64d5b24b7fd3d5026977b7a87a', '', 0, '', '', 1, 'local'),
('f138a', 'Carlos29', '$2y$12$DUmul1bagMdxtsqur.jNK.u01rZ.sKC3nBfs58PmUwgBZm.pxV.Wi', 'carlos29@gmail.com', 'client', 'https://robohash.org/db1e0a3750e0399df3eeee808187d9b4', '', 0, '', '', 1, 'local'),
('f6e8r', 'Ainhoa22', '$2y$12$HTGQ.0KY4c8TNxRjCXPqoeP3LZogd4zEpoHNjAyb0rsrzxG17BrjK', 'ainhoa22@gmail.com', 'client', 'https://i.pravatar.cc/500?u=1314951436582657f9c3e6d3ddde1911', '', 0, '', '', 1, 'local'),
('rFz4mONvFVUa1F5rCEI25SGj0Fl1', 'angeletatorro98', '', 'angeletatorro98@gmail.com', 'client', 'https://lh3.googleusercontent.com/a/ACg8ocICFaUywok03hRKF3BLUiKBRdEjcsKFA_MLPllpjXPlBShY5fGN=s96-c', '', 0, '', '', 0, 'google');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visited`
--

CREATE TABLE `visited` (
  `code_visit` int(11) NOT NULL,
  `code_prop` int(11) NOT NULL,
  `visits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visited`
--

INSERT INTO `visited` (`code_visit`, `code_prop`, `visits`) VALUES
(1, 1, 96),
(2, 2, 85),
(3, 3, 8),
(4, 4, 1),
(5, 5, 17),
(6, 6, 4),
(7, 7, 0),
(8, 8, 0),
(9, 9, 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`code_act`),
  ADD UNIQUE KEY `name_act` (`name_act`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`code_cat`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`code_city`);

--
-- Indices de la tabla `extra`
--
ALTER TABLE `extra`
  ADD PRIMARY KEY (`code_extra`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`code_img`),
  ADD KEY `code_prop` (`code_prop`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`username`,`code_prop`),
  ADD KEY `code_user` (`username`),
  ADD KEY `code_prop` (`code_prop`),
  ADD KEY `code_user_2` (`username`,`code_prop`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_prod`);

--
-- Indices de la tabla `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`code_prop`),
  ADD UNIQUE KEY `ref_cat` (`ref_cat`),
  ADD KEY `code_city` (`code_city`);

--
-- Indices de la tabla `property_activity`
--
ALTER TABLE `property_activity`
  ADD PRIMARY KEY (`code_prop`,`code_act`),
  ADD KEY `code_act` (`code_act`);

--
-- Indices de la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD PRIMARY KEY (`code_prop`,`code_cat`),
  ADD KEY `code_cat` (`code_cat`);

--
-- Indices de la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD PRIMARY KEY (`code_prop`,`code_extra`),
  ADD KEY `code_extra` (`code_extra`);

--
-- Indices de la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD PRIMARY KEY (`code_prop`,`code_type`),
  ADD KEY `code_type` (`code_type`);

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id_purchase`);

--
-- Indices de la tabla `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`code_type`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id_user` (`id_user`,`username`),
  ADD UNIQUE KEY `id_user_2` (`id_user`,`username`,`email`);

--
-- Indices de la tabla `visited`
--
ALTER TABLE `visited`
  ADD KEY `code_prop` (`code_prop`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `code_act` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `code_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `code_city` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `extra`
--
ALTER TABLE `extra`
  MODIFY `code_extra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `code_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `property`
--
ALTER TABLE `property`
  MODIFY `code_prop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id_purchase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `type`
--
ALTER TABLE `type`
  MODIFY `code_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`);

--
-- Filtros para la tabla `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_ibfk_1` FOREIGN KEY (`code_city`) REFERENCES `city` (`code_city`);

--
-- Filtros para la tabla `property_activity`
--
ALTER TABLE `property_activity`
  ADD CONSTRAINT `property_activity_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_activity_ibfk_2` FOREIGN KEY (`code_act`) REFERENCES `activity` (`code_act`);

--
-- Filtros para la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD CONSTRAINT `property_category_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_category_ibfk_2` FOREIGN KEY (`code_cat`) REFERENCES `category` (`code_cat`);

--
-- Filtros para la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD CONSTRAINT `property_extras_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_extras_ibfk_2` FOREIGN KEY (`code_extra`) REFERENCES `extra` (`code_extra`);

--
-- Filtros para la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD CONSTRAINT `property_type_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_type_ibfk_2` FOREIGN KEY (`code_type`) REFERENCES `type` (`code_type`);

--
-- Filtros para la tabla `visited`
--
ALTER TABLE `visited`
  ADD CONSTRAINT `visited_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
