### AI Motion Comic & Video Factory
**AI One-Stop Short Film/Motion Comic Generation Platform**  
**Industrial AI Motion Comic & Video Workbench**

---

**AI Motion Comic & Video Factory** is an AI-powered one-stop platform for short films and motion comics, designed for creators to efficiently produce content from inspiration to final output.  
It abandons traditional "lottery-style" generation and adopts an industrialized **"Script-to-Asset-to-Keyframe"** workflow. By deeply integrating advanced AI models via the **AntSK API**, it achieves **"full automation from script to final output with a single sentence"**, while precisely controlling character consistency, scene continuity, and camera movements.

---

### Interface Overview

#### **Project Management**
- **Phase 01: Script & Storyboard**  
- **Phase 02: Character & Scene Assets**  
- **Phase 03: Director Workbench**  
- **Phase 04: Final Export**  
- **Prompt Management**  

---

### **Core Philosophy: Keyframe-Driven**
Traditional **Text-to-Video** methods often struggle to control specific camera movements and frame transitions. **BigBanana** introduces the **Keyframe** concept from animation production:  

1. **Frame-First Approach**: Generate precise **Start** and **End** frames first.  
2. **Interpolation**: Use the **Veo model** to create smooth video transitions between frames.  
3. **Asset Constraints**: All frames are strictly constrained by **character reference images** and **scene concept art** to prevent distortions.  

---

### **Core Functional Modules**

#### **Phase 01: Script & Storyboard**  
- **Smart Script Breakdown**: Input a novel or story outline, and AI automatically structures it into a standard script with scenes, timing, and mood.  
- **Visual Translation**: Convert text descriptions into professional **Midjourney/Stable Diffusion prompts**.  
- **Pacing Control**: Set target duration (e.g., 30s trailer, 3min short film), and AI plans shot density accordingly.  

✨ **Manual Editing (NEW)**  
- Edit character visual descriptions and storyboard frame prompts.  
- Modify character lists per shot (add/remove characters).  
- Adjust action descriptions and dialogue.  
- Ensure precise control over every detail.  

#### **Phase 02: Assets & Casting**  
- **Character Consistency**:  
  - Generate standard reference images for each character.  
  - **Wardrobe System**: Support multiple outfits (e.g., casual, battle, injured) while maintaining facial consistency via a **Base Look**.  
- **Scene Concept Design**: Generate environmental reference images to ensure unified lighting across shots in the same scene.  

#### **Phase 03: Director Workbench**  
- **Grid-Based Storyboard**: Manage all shots holistically.  
- **Precise Control**:  
  - **Start Frame**: Generate the opening frame with strong consistency.  
  - **End Frame (Optional)**: Define the closing state (e.g., character turning, lighting change).  
- **Context-Aware Generation**: AI reads the **current scene + character-specific outfit** to eliminate continuity errors.  
- **Veo Video Generation**: Supports **Image-to-Video** and **Keyframe Interpolation** modes.  

#### **Phase 04: Final Export**  
- **Real-Time Preview**: Review generated motion comic clips in timeline format.  
- **Render Tracking**: Monitor API rendering progress in real time.  
- **Asset Export**: Export all high-definition keyframes and MP4 clips for post-production in **Premiere/After Effects**.  

---

### **Technical Architecture**
- **Frontend**: React 19, Tailwind CSS (Sony Industrial Design Style)  
- **AI Models**:  
  - **Logic/Text**: gpt-5.1 (High-intelligence script analysis)  
  - **Vision**: gemini-3-pro-image-preview (High-speed drawing)  
  - **Video**: veo_3_1_i2v_s_fast_fl_landscape / sora-2 (Keyframe interpolation)  
- **Storage**: IndexedDB (Local browser database for data privacy, no backend dependency)  

---

### **Why Choose GitCC API?**  
This project integrates with **GitCC API (NewAPI-compatible)** to empower creators with AI capabilities:  

🎯 **Full Model Coverage**  
- **Text Models**: GPT-5.2, GPT-5.1, Claude 3.5 Sonnet  
- **Visual Models**: Gemini 3 Pro, Nano Banana Pro  
- **Video Models**: Sora 2, Veo 3.1 (Supports keyframe interpolation)  
- **Unified API**: No need to switch platforms.  

🚀 **Developer-Friendly**  
- **OpenAI-Compatible Protocol**: Zero migration cost.  
- **Comprehensive Docs**: Detailed API documentation and sample code.  
- **Real-Time Monitoring**: Visual usage stats and cost tracking.  

**Ideal For**: Daily creation, rapid prototyping, and idea validation.  
**Best For This Project**: Systematic short film production, batch video generation, and industrial workflows.  

---

### **Getting Started**

#### **Option 1: Local Development**  
```bash
# 1. Clone the project
git clone https://github.com/yuanzhongqiao/deep-comedy-pro.git
cd deep-comedy-pro

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Access the app
# Open http://localhost:3000 in your browser
```

#### **Option 2: Docker Deployment (Recommended)**  
```bash
# 1. Clone the project
git clone https://github.com/yuanzhongqiao/deep-comedy-pro.git
cd BigBanana-AI-Director

# 2. Build and start with Docker Compose
docker-compose up -d --build

# 3. Access the app
# Open http://localhost:3005 in your browser

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

#### **Option 3: Manual Docker Commands**  
```bash
# 1. Clone the project
git clone  https://github.com/yuanzhongqiao/deep-comedy-pro.git
cd deep-comedy-pro

# 2. Build the image
docker build -t deep-comedy-pro .

# 3. Run the container
docker run -d -p 3005:80 --name deep-comedy-pro-ai-app deep-comedy-pro

# 4. Access the app
# Open http://localhost:3005 in your browser

# View logs
docker logs -f deep-comedy-pro-ai-app

# Stop the container
docker stop deep-comedy-pro-ai-app
```

#### **Other Commands**  
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Force rebuild Docker images (no cache)
docker-compose build --no-cache
docker-compose up -d --force-recreate
```

---

### **Quick Start Guide**  
1. **Configure API Key**: Launch the app and input your **API Key** (from api.gitcc.com).  
2. **Story Input**: Enter your story idea in **Phase 01** and click **"Generate Storyboard."**  
3. **Art Setup**: Proceed to **Phase 02** to generate character reference images and key scene art.  
4. **Shot Production**: Move to **Phase 03** to generate keyframes for each shot.  
5. **Animation Generation**: Confirm keyframes and batch-generate video clips.
