"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TEMPLATES, colors, fonts } from "@/components/onboarding/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PortfolioManager({ user, profile, features, initialImages }: any) {
  const supabase = createClient();
  const router = useRouter();
  
  const [images, setImages] = useState(initialImages);
  const [isPublic, setIsPublic] = useState(profile.is_public);
  const [selectedTemplate, setSelectedTemplate] = useState(profile.selected_template || "altar");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Sync state when server props change during client-side navigations
  React.useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  React.useEffect(() => {
    setIsPublic(profile.is_public);
    setSelectedTemplate(profile.selected_template || "altar");
  }, [profile]);

  const isPro = features?.tier === "pro";
  const maxImages = features?.max_images || 10;

  const handleTogglePublish = async () => {
    const newValue = !isPublic;
    setIsPublic(newValue);
    await (supabase as any).from("profiles").update({ is_public: newValue }).eq("id", user.id);
    router.refresh();
  };

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    await (supabase as any).from("profiles").update({ selected_template: templateId }).eq("id", user.id);
    router.refresh();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const availableSlots = maxImages - images.length;

    if (availableSlots <= 0) {
      setError(`You have reached your subscription plan limit of ${maxImages} images.`);
      return;
    }

    const filesToUpload = fileArray.slice(0, availableSlots);
    if (fileArray.length > availableSlots) {
      setError(`Only enough space to upload ${availableSlots} out of ${fileArray.length} images.`);
    } else {
      setError("");
    }

    setUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file, index) => {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(filePath);

        const { data: dbImage, error: dbError } = await (supabase as any)
          .from("portfolio_images")
          .insert({
            user_id: user.id,
            storage_path: publicUrlData.publicUrl,
            display_order: images.length + index,
            caption: ""
          })
          .select()
          .single();

        if (dbError) throw dbError;
        
        return dbImage;
      });

      const results = await Promise.allSettled(uploadPromises);
      
      const successfulImages = results
        .filter((res: any) => res.status === 'fulfilled')
        .map((res: any) => res.value);
        
      const failed = results.filter((res: any) => res.status === 'rejected');

      if (successfulImages.length > 0) {
        setImages((prev: any) => [...prev, ...successfulImages]);
        router.refresh();
      }
      
      if (failed.length > 0) {
        const errorMsg = (failed[0] as any).reason?.message || "Failed to upload some images.";
        setError(errorMsg);
      }
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload some images.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId: string, storagePath: string) => {
    try {
      // Clean up storage bucket to correctly map with Trigger quotas
      const filePath = storagePath.split('portfolio-images/')[1];
      if (filePath) {
        await supabase.storage.from("portfolio-images").remove([filePath]);
      }
      
      await (supabase as any).from("portfolio_images").delete().eq("id", imageId);
      setImages(images.filter((img: any) => img.id !== imageId));
      router.refresh();
    } catch (err) {
      console.error("Error deleting", err);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL images? This cannot be undone.")) return;
    try {
      setUploading(true);
      const filePaths = images.map((img: any) => img.storage_path.split('portfolio-images/')[1]).filter(Boolean);
      if (filePaths.length > 0) {
        await supabase.storage.from("portfolio-images").remove(filePaths);
      }
      await (supabase as any).from("portfolio_images").delete().eq("user_id", user.id);
      setImages([]);
      router.refresh();
    } catch (err) {
      console.error("Error deleting all", err);
      setError("Failed to bulk delete images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: colors.cream, fontFamily: fonts.body }}>
      <header style={{ position: "relative", padding: "4rem 2rem", overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "flex-end", minHeight: "300px", borderBottom: `1px solid ${colors.border}` }}>
        <video 
          autoPlay loop muted playsInline
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.5)" }}
        >
          <source src="/hero_vid_neon_nights.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "relative", zIndex: 1, color: "white" }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: "42px", margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Portfolio Manager</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.9)", fontSize: "16px", marginTop: "0.5rem", textShadow: "0 1px 5px rgba(0,0,0,0.5)" }}>
            /{profile.username}
          </p>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "white", textDecoration: "none", fontSize: "14px", textShadow: "0 1px 4px rgba(0,0,0,0.8)", fontWeight: 500 }}>← Back to Dashboard</Link>
          <a href={`/${profile.username}`} target="_blank" style={{ padding: "10px 24px", backgroundColor: colors.white, borderRadius: "4px", color: colors.charcoal, textDecoration: "none", fontSize: "14px", fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>View Live</a>
        </div>
      </header>

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>
        
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
          
          <div style={{ backgroundColor: colors.white, padding: "2rem", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: "18px", marginTop: 0 }}>Visibility Status</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
              <div style={{ 
                width: "12px", height: "12px", borderRadius: "50%", 
                backgroundColor: isPublic ? colors.success : colors.textMuted 
              }} />
              <span style={{ fontWeight: 600 }}>{isPublic ? "Published" : "Draft (Hidden)"}</span>
            </div>
            <p style={{ fontSize: "14px", color: colors.textSecondary, margin: "1rem 0" }}>
              {isPublic ? "Your portfolio is visible to the public." : "Only you can see your portfolio while in Draft mode."}
            </p>
            <button 
              onClick={handleTogglePublish}
              style={{
                padding: "8px 16px", backgroundColor: isPublic ? "#F3F4F6" : colors.charcoal,
                color: isPublic ? colors.charcoal : colors.white,
                border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: 600
              }}
            >
              {isPublic ? "Unpublish to Draft" : "Publish Portfolio"}
            </button>
          </div>

          <div style={{ backgroundColor: colors.white, padding: "2rem", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: "18px", marginTop: 0 }}>Active Template</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
              {TEMPLATES.map(t => {
                const disabled = t.isPro && !isPro;
                return (
                  <div 
                    key={t.id} 
                    onClick={() => !disabled && handleTemplateSelect(t.id)}
                    style={{
                      padding: "1rem",
                      border: `2px solid ${selectedTemplate === t.id ? colors.charcoal : colors.border}`,
                      borderRadius: "6px",
                      cursor: disabled ? "not-allowed" : "pointer",
                      opacity: disabled ? 0.5 : 1,
                      position: "relative"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>{t.name}</div>
                    {disabled && <div style={{ fontSize: "10px", backgroundColor: "#E5E7EB", padding: "2px 6px", borderRadius: "8px", position: "absolute", top: "10px", right: "10px" }}>PRO</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section style={{ backgroundColor: colors.white, padding: "2rem", borderRadius: "8px", border: `1px solid ${colors.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <h2 style={{ fontSize: "18px", margin: 0 }}>Gallery Management</h2>
              {images.length > 0 && (
                <button 
                  onClick={handleDeleteAll}
                  disabled={uploading}
                  style={{ fontSize: "12px", color: colors.error, background: "none", border: `1px solid ${colors.error}`, padding: "4px 8px", borderRadius: "4px", cursor: uploading ? "not-allowed" : "pointer" }}
                >
                  Clear All
                </button>
              )}
            </div>
            <div style={{ fontSize: "14px", color: colors.textSecondary }}>
              {images.length} / {maxImages} Images Used
            </div>
          </div>

          {error && <div style={{ backgroundColor: colors.errorLight, color: colors.error, padding: "1rem", borderRadius: "4px", marginBottom: "1rem" }}>{error}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {images.map((img: any, idx: number) => (
              <div key={img.id} style={{ position: "relative", aspectRatio: "3/4", borderRadius: "4px", overflow: "hidden", border: `1px solid ${colors.border}` }}>
                <Image src={img.storage_path} alt="Portfolio" fill unoptimized={true} style={{ objectFit: "cover" }} />
                <button 
                  onClick={() => handleDelete(img.id, img.storage_path)}
                  style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.5)", color: "white", border: "none", width: "24px", height: "24px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  ×
                </button>
                <div style={{ position: "absolute", bottom: "8px", left: "8px", background: "rgba(0,0,0,0.5)", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>
                  {idx + 1}
                </div>
              </div>
            ))}
            
            {images.length < maxImages && (
              <label 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ 
                  aspectRatio: "3/4", border: `2px dashed ${isDragging ? colors.charcoal : colors.border}`, borderRadius: "4px", 
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", backgroundColor: isDragging ? "rgba(0,0,0,0.02)" : "#F9FAFB",
                  transition: "all 0.2s ease"
                }}
              >
                <input type="file" accept="image/*" multiple onChange={handleFileUpload} disabled={uploading} style={{ display: "none" }} />
                <span style={{ fontSize: "24px", color: isDragging ? colors.charcoal : colors.textMuted }}>
                  {uploading ? "..." : "+"}
                </span>
                <span style={{ fontSize: "14px", color: colors.textSecondary, marginTop: "0.5rem", textAlign: "center", padding: "0 10px" }}>
                  {uploading ? "Uploading..." : "Click or Drag images"}
                </span>
              </label>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
