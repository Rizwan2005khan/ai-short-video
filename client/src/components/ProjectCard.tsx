import type React from "react";
import type { Project } from "../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EllipsisIcon, ImageIcon, Loader2Icon, Share2Icon } from "lucide-react";
import { button } from "framer-motion/client";

const ProjectCard = ({
  gen,
  setGenerations,
  forCommunity = false,
}: {
  gen: Project;
  setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommunity?: boolean;
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div key={gen.id} className="mb-4 break-inside-avoid">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">
        {/* Preview */}
        <div
          className={`${
            gen.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"
          } relative overflow-hidden`}
        >
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
                gen.generatedVideo
                  ? "group-hover:opacity-0"
                  : "group-hover:opacity-105"
              }`}
            />
          )}

          {gen.generatedVideo && (
            <video
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )}

          {!gen.generatedImage && !gen.generatedVideo && (
            <button onClick={() => navigator.share({url: gen.generatedVideo || gen.generatedImage, title: gen.productName, text: gen.productDescription})} className="w-full flex gap-2 items-center px-4 py-2 hover:bg-black/10 cursor-pointer">
              <Share2Icon size={14} />
              Share
            </button>
          )}

          {/* Status badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {gen.isGenerating && (
              <span className="text-xs px-2 py-1 bg-yellow-600/30 rounded-full">
                Generating
              </span>
            )}
            {gen.isPublished && (
              <span className="text-xs px-2 py-1 bg-green-600/30 rounded-full">
                Published
              </span>
            )}
          </div>

          {/* Actions menu */}
          {!forCommunity && (
            <div
              className="absolute right-3 top-3 z-20"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              {/* stays in layout, only opacity changes */}
              <EllipsisIcon className="bg-black/60 text-white rounded-full p-1 size-7 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" />

              <ul
                className={`absolute right-0 mt-2 w-40 text-xs bg-black/80 rounded-lg shadow-md py-1 ${
                  menuOpen ? "block" : "hidden"
                }`}
              >
                {gen.generatedImage && (
                  <li>
                    <a
                      href={gen.generatedImage}
                      download
                      className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
                    >
                      <ImageIcon size={14} />
                      Download Image
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Source images */}
          <div className="absolute right-3 bottom-3 flex">
            {gen.uploadedImages?.[0] && (
              <img
                src={gen.uploadedImages[0]}
                alt="product"
                className="w-16 h-16 object-cover rounded-full animate-float"
              />
            )}
            {gen.uploadedImages?.[1] && (
              <img
                src={gen.uploadedImages[1]}
                alt="model"
                className="w-16 h-16 object-cover rounded-full animate-float -ml-8"
                style={{ animationDelay: "3s" }}
              />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-lg">{gen.productName}</h3>
              <p className="text-sm text-gray-400">
                Created: {new Date(gen.createdAt).toLocaleString()}
              </p>
              {gen.updatedAt && (
                <p className="text-xs text-gray-500">
                  Updated: {new Date(gen.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
              Aspect: {gen.aspectRatio}
            </span>
          </div>

          {gen.productDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <div className="text-sm text-gray-300 bg-white/5 p-2 rounded-md">
                {gen.productDescription}
              </div>
            </div>
          )}

          {gen.userPrompt && (
            <div className="mt-3 text-xs text-gray-300">{gen.userPrompt}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
