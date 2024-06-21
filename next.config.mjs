import postcssPresetMantine from "postcss-preset-mantine";
import simpleVars from "postcss-simple-vars";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                postcssPresetMantine(),
                simpleVars({
                  variables: {
                    "mantine-breakpoint-xs": "36em",
                    "mantine-breakpoint-sm": "48em",
                    "mantine-breakpoint-md": "62em",
                    "mantine-breakpoint-lg": "75em",
                    "mantine-breakpoint-xl": "88em",
                  },
                }),
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
