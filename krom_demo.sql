-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2023 at 08:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `krom_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_book`
--

CREATE TABLE `contact_book` (
  `id` int(11) NOT NULL,
  `full_name` tinytext NOT NULL,
  `phone_number` tinytext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_book`
--

INSERT INTO `contact_book` (`id`, `full_name`, `phone_number`, `created_at`, `updated_at`) VALUES
(6, '0a6b98967501230b7ba64e30bff783980c4c4f4f8187afcf071ca93afca6f138', '3163d320b9231b4315ad2249d18dd7f6', '2023-10-15 06:01:04', NULL),
(7, '01d57cb4f715378d0fe4c5550384be63', '2f48c12061377c77b4f01a54b4aaf76d', '2023-10-15 06:09:26', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_book`
--
ALTER TABLE `contact_book`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_book`
--
ALTER TABLE `contact_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;
