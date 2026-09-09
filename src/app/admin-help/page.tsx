"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, LayoutDashboard, Search, Settings, Coffee, ShoppingBag, Smartphone, Image as ImageIcon, CheckCircle } from "lucide-react";

export default function AdminHelpPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction", 
        "finding-content", 
        "editing-contact", 
        "managing-menu", 
        "managing-shop", 
        "managing-social", 
        "uploading-images", 
        "saving-publishing"
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "introduction", icon: LayoutDashboard, label: "1. Introduction to Your Dashboard" },
    { id: "finding-content", icon: Search, label: "2. Finding What You Want to Edit" },
    { id: "editing-contact", icon: Settings, label: "3. Changing Contact Info & Links" },
    { id: "managing-menu", icon: Coffee, label: "4. Adding and Editing Menu Dishes" },
    { id: "managing-shop", icon: ShoppingBag, label: "5. Adding and Editing Shop Products" },
    { id: "managing-social", icon: Smartphone, label: "6. Managing TikTok & Instagram Videos" },
    { id: "uploading-images", icon: ImageIcon, label: "7. Uploading and Naming Images" },
    { id: "saving-publishing", icon: CheckCircle, label: "8. How to Save and Go Live" },
  ];

  return (
    <div style={{ backgroundColor: "#FAF6F0", minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif", color: "#1A1A1A" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#1A1A1A", color: "#FAF6F0", padding: "30px 40px", borderBottom: "4px solid #C8973A", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <BookOpen size={32} color="#C8973A" />
          <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>Culture Glow Website Management Guide</h1>
        </div>
      </header>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "40px", display: "flex", gap: "60px", alignItems: "flex-start" }}>
        
        {/* Interactive Sidebar */}
        <nav style={{ width: "320px", flexShrink: 0, position: "sticky", top: "120px" }}>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px 20px",
                      backgroundColor: isActive ? "#FBF3E2" : "transparent",
                      color: isActive ? "#7A5B1E" : "#555",
                      border: isActive ? "1px solid #C8973A" : "1px solid transparent",
                      borderRadius: "8px",
                      fontWeight: isActive ? "600" : "500",
                      fontSize: "14px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Main Content Area */}
        <main style={{ flexGrow: 1, paddingBottom: "100px", maxWidth: "850px" }}>
          
          {/* SECTION 1 */}
          <section id="introduction" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              1. Introduction to Your Dashboard
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Welcome to your website editor! This tool allows you to change text, add photos, and create new items for your website without needing to write any code. 
              </p>
              
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>How to Log In</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Open your web browser and go to the website address: <a href="https://be.contentful.com" style={{ color: "#C8973A", textDecoration: "underline", fontWeight: "600" }} target="_blank" rel="noopener noreferrer">be.contentful.com</a></li>
                <li>Enter the email address and password provided to you.</li>
                <li>Once you are logged in, look at the very top-left corner of the screen to ensure it says <strong>Culture Glow</strong>. This confirms you are in the correct workspace.</li>
              </ol>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>The Top Navigation Bar</h3>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Here is a macro view of your entire dashboard. At the very top of your screen, there is a horizontal black bar with several tabs. 
              </p>
              
              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", marginTop: "20px", marginBottom: "20px" }}>
                <img src="/admin-help/dashboard.png" alt="Macro View of Dashboard" style={{ width: "100%", display: "block" }} />
              </div>

              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Taking a closer look at that top bar (micro view), you will only ever need to use two of these tabs:
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>The Content Tab:</strong> Clicking this tab shows you every piece of text, dish, and product.</li>
                <li><strong>The Media Tab:</strong> Clicking this tab shows you a gallery of every image you have uploaded.</li>
              </ul>
              
              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", marginTop: "20px" }}>
                <img src="/admin-help/nav-bar.png" alt="Micro View of the Top Navigation Bar" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="finding-content" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              2. Finding What You Want to Edit
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                When you click on the <strong>Content</strong> tab at the top of the screen, you will see a massive list of everything on your website. To avoid getting overwhelmed, you must filter this list.
              </p>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Using the Content Type Filter</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Look at the right side of the main list area. You will see a search bar, and next to it, a button labeled <strong>Content type</strong>.</li>
                <li>Click the <strong>Content type</strong> button to open a dropdown menu.</li>
                <li>Select the specific category you want to work on. For example, if you want to change a price on the menu, select <strong>Menu Item</strong> from the list.</li>
                <li>The main screen will instantly update to show you <em>only</em> the items that belong to that category.</li>
              </ol>

              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", marginTop: "20px" }}>
                <img src="/admin-help/dashboard.png" alt="The main screen showing the filter area" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="editing-contact" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              3. Changing Contact Info & Links
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Information like your phone number, email address, physical address, and social media links appear at the bottom of every single page on your website (in the footer). You edit all of these in one central place.
              </p>
              
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Finding the Settings</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Go to the main <strong>Content</strong> screen using the top navigation bar.</li>
                <li>Click the <strong>Content type</strong> filter button on the right side of the screen.</li>
                <li>Select <strong>Global Settings</strong> from the dropdown menu.</li>
                <li>You will see exactly one item in the list. Click on that item to open the editor.</li>
              </ol>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Making Changes</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Inside the editor screen, find the text boxes labeled Email Address, WhatsApp Number, and Physical Address.</li>
                <li>Click inside any of these text boxes, type your new information, and delete anything old.</li>
                <li>Scroll down to find and update your Instagram or TikTok links.</li>
                <li>Save and publish your work (instructions are in Section 8).</li>
              </ol>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/global-settings.png" alt="Global Settings Part 1" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/global-settings-2.png" alt="Global Settings Part 2" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/global-settings-3.png" alt="Global Settings Part 3" style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="managing-menu" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              4. Adding and Editing Menu Dishes
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                This section explains how to change the price of an existing dish, or add a completely new dish to your restaurant menu page.
              </p>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>How to Add a Brand New Dish</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Go to the main <strong>Content</strong> screen.</li>
                <li>Look at the top right corner of the screen and click the blue button labeled <strong>Add entry</strong>.</li>
                <li>A dropdown menu will appear. Select <strong>Menu Item</strong>. A blank editor screen will open.</li>
              </ol>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Basic Dish Details</h3>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                On the editor screen, fill out these boxes to set up the dish:
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>Name box:</strong> Type the exact name of the dish.</li>
                <li><strong>Price box:</strong> Type the price using numbers and a decimal point (for example: "15.00").</li>
                <li><strong>Description box:</strong> Type a mouth-watering description of what is in the dish.</li>
              </ul>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Categorization & Images</h3>
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>Category box:</strong> Click this box to select if this is a Starter, Main, Dessert, or Drink.</li>
                <li><strong>Image box:</strong> Click the "Add media" link to upload a photograph of the dish.</li>
                <li><strong>Dietary Tags box:</strong> Check any boxes that apply, such as "Vegan".</li>
              </ul>

              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", margin: "30px 0" }}>
                <img src="/admin-help/menu-item-page-4.png" alt="The Menu Item Editor Screen" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="managing-shop" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              5. Adding and Editing Shop Products
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Managing products in your online shop is almost identical to managing your menu items. 
              </p>

              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>To start, go to the main <strong>Content</strong> screen.</li>
                <li>To add a new product, click the blue <strong>Add entry</strong> button in the top right corner and select <strong>Shop Product</strong>.</li>
                <li>To edit an existing product, click the <strong>Content type</strong> filter, choose <strong>Shop Product</strong>, and click on the product you want to change.</li>
              </ol>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Important Shop Fields</h3>
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>Gallery box:</strong> Unlike a menu item, a shop product can have multiple pictures. Use this box to upload a slideshow of images showing different angles of the product.</li>
                <li><strong>Badge box:</strong> If you want a highlighted word to appear over the product picture (for example: "Sold Out"), type that exact phrase into this box.</li>
              </ul>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/shop-product-page-1.png" alt="Shop Product Overview" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/shop-product-page-2.png" alt="Shop Product Details" style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="managing-social" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              6. Managing TikTok & Instagram Videos
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                You can display your favorite TikTok videos and Instagram Reels directly on your website to show off your cooking and events.
              </p>

              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Go to the main <strong>Content</strong> screen.</li>
                <li>Click the blue <strong>Add entry</strong> button in the top right corner.</li>
                <li>Select either <strong>TikTok Post</strong> or <strong>Instagram Reel</strong>.</li>
                <li>In the editor screen, find the <strong>URL box</strong> and paste the direct internet link to the video.</li>
                <li>Find the <strong>Thumbnail box</strong> and upload a cover photo for the video.</li>
              </ol>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Where Will The Video Appear?</h3>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Scroll down in the video editor screen and you will find two checkbox options:
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>Show On Home:</strong> Checking this box places the video on the main homepage of your website.</li>
                <li><strong>Show On Gallery:</strong> Checking this box places the video on your dedicated Gallery webpage.</li>
              </ul>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/social-media-page-1.png" alt="Social Media Editor Part 1" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/social-media-page-2.png" alt="Social Media Editor Part 2" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/social-media-page-3.png" alt="Social Media Editor Part 3" style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2" }}>
                  <img src="/admin-help/social-media-page-4.png" alt="Social Media Editor Part 4" style={{ width: "100%", display: "block" }} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="uploading-images" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              7. Uploading and Naming Images
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Whenever you are editing a dish or a product and you need to add a picture, you will see a box labeled <strong>Image</strong> or <strong>Media</strong>. 
              </p>

              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Click the link that says <strong>Add media</strong>.</li>
                <li>A small menu will drop down. If the image is saved on your computer, select <strong>Add new media</strong>. </li>
                <li>If you have already uploaded the image in the past, select <strong>Link existing media</strong> to choose it from your library.</li>
              </ol>
              
              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", marginBottom: "30px", maxWidth: "600px" }}>
                <img src="/admin-help/media-upload.png" alt="The Add Media Dropdown Menu" style={{ width: "100%", display: "block" }} />
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Important: Image Descriptions</h3>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                When you upload a brand new image from your computer, a new screen will pop up asking for a <strong>Title</strong> and a <strong>Description</strong>. 
                <br /><br />
                You must always write a clear, descriptive sentence in the Description box explaining exactly what is in the photograph (for example: "A close-up photograph of spicy red lentils served on injera bread"). This allows blind users with screen readers to understand the picture, and it drastically improves how often your website appears in Google search results.
              </p>
            </div>
          </section>

          {/* SECTION 8 */}
          <section id="saving-publishing" style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "700", borderBottom: "2px solid #DDD9D2", paddingBottom: "10px", marginBottom: "30px" }}>
              8. How to Save and Go Live
            </h2>
            <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #DDD9D2" }}>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px", fontWeight: "600" }}>
                Typing text into a box does not update your website automatically. You must explicitly tell the system to send your changes to the live website.
              </p>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>Understanding Status Colors</h3>
              <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.8", fontSize: "16px" }}>
                Whenever you are inside an editor screen looking at a specific dish or product, look at the very far right side of your computer screen. You will see a tall, narrow sidebar. At the top of this sidebar, there is a colored circle indicating the status of the item:
              </p>
              
              <ul style={{ listStyleType: "disc", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li><strong>Gray Circle (Draft):</strong> Your work is saved securely, but it is totally invisible to the public.</li>
                <li><strong>Blue Circle (Changed):</strong> This item is currently live on your website, but the new text you just typed is <em>not</em> live yet.</li>
                <li><strong>Green Circle (Published):</strong> The exact text you are looking at is currently live and visible on your website.</li>
              </ul>

              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px", marginTop: "30px" }}>The Publish Process</h3>
              <ol style={{ listStyleType: "decimal", paddingLeft: "30px", marginBottom: "30px", lineHeight: "2", color: "#555", fontSize: "16px" }}>
                <li>Look at the right-side sidebar of the editor screen.</li>
                <li>Find the button labeled <strong>Change status</strong>.</li>
                <li>Click the <strong>Change status</strong> button to open a dropdown menu.</li>
                <li>Click <strong>Publish</strong> from that list. The circle will turn green.</li>
                <li>Refresh your actual website in a new tab to see your work live.</li>
              </ol>

              <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid #DDD9D2", marginBottom: "30px", maxWidth: "500px" }}>
                <img src="/admin-help/menu-item-page-status-change-dropdown.png" alt="The Change Status Dropdown on the right side of the screen" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
