import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCategory, MdIntegrationInstructions, MdManageAccounts, MdOutlineAddShoppingCart, MdOutlineDashboard, MdOutlineInventory, MdOutlineInventory2, MdOutlineNaturePeople, MdOutlinePointOfSale } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbLogs, TbReport, TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart, AiFillCustomerService } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaPeopleCarryBox, FaPersonBooth, FaProductHunt } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuView } from "react-icons/lu";
import { IoPersonAddSharp, IoSettings } from "react-icons/io5";
import { GrStatusCritical, GrSystem } from "react-icons/gr";
import { Tooltip } from "antd";
import { IoMdPersonAdd } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    {
      name: "Products",
      link: "/products/add-product",
      icon: FaProductHunt,
      subMenu: [
        {
          name: "Add Product",
          icon: MdOutlineProductionQuantityLimits,
          link: "/products/add-product",
        },
        {
          name: "View Products",
          icon: LuView,
          link: "/products/product-list",
        },
        {
          name: "Product Categories",
          icon: MdCategory,
          link: "/products/categories-list",
        },
      ],
    },
    {
      name: "Orders",
      link: "/orders/add-order",
      icon: MdIntegrationInstructions,
      subMenu: [
        {
          name: "Add Order",
          icon: MdOutlineAddShoppingCart,
          link: "/orders/add-order",
        },
        {
          name: "View Orders",
          icon: LuView,
          link: "/orders/view-orders",
        },
        {
          name: "Order Status",
          icon: GrStatusCritical,
          link: "/orders/order-status",
        },
      ],
    },
    {
      name: "Customers",
      link: "/customers/add-customers",
      icon: AiFillCustomerService,
      subMenu: [
        {
          name: "Add Customers",
          icon: IoPersonAddSharp,
          link: "/customers/add-customers",
        },
        {
          name: "View Customers",
          icon: FaPersonBooth,

          link: "/customers/view-customers",
        },
      ],
    },
    {
      name: "Suppliers",
      link: "/suppliers/add-suppliers",
      icon: FaPeopleCarryBox,
      subMenu: [
        {
          name: "Add Suppliers",
          icon: IoMdPersonAdd,
          link: "/suppliers/add-suppliers",
        },
        {
          name: "View Suppliers",
          icon: MdOutlineNaturePeople,

          link: "/suppliers/view-suppliers",
        },
      ],
    },
    {
      name: "Inventory",
      link: "/inventory/inventory-levels",
      icon: MdOutlineInventory,
      subMenu: [
        {
          name: "Inventory Levels",
          icon: SiLevelsdotfyi,
          link: "/inventory/inventory-levels",
        },
        {
          name: "Inventory Logs",
          icon: TbLogs,

          link: "/inventory/inventory-levels",
        },
      ],
    },
    {
      name: "Reports",
      link: "/reports/sales-reports",
      icon: TbReport,
      subMenu: [
        {
          name: "Sales Reports",
          icon: MdOutlinePointOfSale,
          link: "/reports/sales-reports",
        },
        {
          name: "Inventory Reports",
          icon: MdOutlineInventory2,
          link: "/reports/inventory-reports",
        },
      ],
    },
    {
      name: "Settings",
      link: "/settings/user-management",
      icon: IoSettings,
      subMenu: [
        {
          name: "User Management",
          icon: MdManageAccounts,
          link: "/settings/user-management",
        },
        {
          name: "System Settings",
          icon: GrSystem,
          link: "/settings/user-management",
        },
      ],
    },
  ];

  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleSubMenuToggle = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <div key={i}>
              <div
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
                onClick={() => (menu.subMenu ? handleSubMenuToggle(i) : null)}
              >
                <Tooltip
                  title={
                    menu.subMenu && (
                      <div className="flex flex-col">
                        {menu.subMenu.map((subMenu, j) => (
                          <Link
                            to={subMenu.link}
                            key={j}
                            className=" text-sm font-medium p-2 hover:bg-gray-700 rounded-md flex gap-3"
                          >
                            <div>
                              {React.createElement(subMenu?.icon, {
                                size: "20",
                              })}
                            </div>

                            {subMenu.name}
                          </Link>
                        ))}
                      </div>
                    )
                  }
                  placement="right"
                  color="white"
                  overlayInnerStyle={{ color: "black" }}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                </Tooltip>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
              </div>
              {menu.subMenu && activeMenu === i && (
                <div className="ml-8 mt-2">
                  {menu.subMenu.map((subMenu, j) => (
                    <Link
                      to={subMenu.link}
                      key={j}
                      className={`flex gap-3 text-sm font-medium p-2 hover:bg-gray-700 rounded-md ${
                        !open && "hidden"
                      }`}
                    >
                      <div>
                        {React.createElement(subMenu?.icon, { size: "20" })}
                      </div>
                      {subMenu.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default Sidebar;
