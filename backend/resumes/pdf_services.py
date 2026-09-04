"""
Resume PDF Generation Service using ReportLab.
Generates clean, high-fidelity A4 vector PDF documents matching the selected template's
layout family (single-column, sidebar-left, sidebar-right, dark-sidebar, minimalist serif,
color-band, timeline, photo-header, compact-table, creative-accent).
"""
import io
import os
import re
import html
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    BaseDocTemplate,
    PageTemplate,
    Frame,
    FrameBreak,
    NextPageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# =============================================================================
# 0. FONT REGISTRATION (Plus Jakarta Sans vector fonts)
# =============================================================================
FONTS_DIR = os.path.join(os.path.dirname(__file__), "fonts")
HAS_PLUS_JAKARTA = False

try:
    reg_path = os.path.join(FONTS_DIR, "PlusJakartaSans-Regular.ttf")
    bold_path = os.path.join(FONTS_DIR, "PlusJakartaSans-Bold.ttf")
    med_path = os.path.join(FONTS_DIR, "PlusJakartaSans-Medium.ttf")
    sbold_path = os.path.join(FONTS_DIR, "PlusJakartaSans-SemiBold.ttf")
    ital_path = os.path.join(FONTS_DIR, "PlusJakartaSans-Italic.ttf")
    bital_path = os.path.join(FONTS_DIR, "PlusJakartaSans-BoldItalic.ttf")

    if os.path.exists(reg_path) and os.path.exists(bold_path):
        pdfmetrics.registerFont(TTFont("PlusJakartaSans", reg_path))
        pdfmetrics.registerFont(TTFont("PlusJakartaSans-Bold", bold_path))
        if os.path.exists(med_path):
            pdfmetrics.registerFont(TTFont("PlusJakartaSans-Medium", med_path))
        if os.path.exists(sbold_path):
            pdfmetrics.registerFont(TTFont("PlusJakartaSans-SemiBold", sbold_path))
        if os.path.exists(ital_path):
            pdfmetrics.registerFont(TTFont("PlusJakartaSans-Italic", ital_path))
        if os.path.exists(bital_path):
            pdfmetrics.registerFont(TTFont("PlusJakartaSans-BoldItalic", bital_path))

        pdfmetrics.registerFontFamily(
            "PlusJakartaSans",
            normal="PlusJakartaSans",
            bold="PlusJakartaSans-Bold",
            italic="PlusJakartaSans-Italic" if os.path.exists(ital_path) else "PlusJakartaSans",
            boldItalic="PlusJakartaSans-BoldItalic" if os.path.exists(bital_path) else "PlusJakartaSans-Bold",
        )
        HAS_PLUS_JAKARTA = True
except Exception:
    HAS_PLUS_JAKARTA = False

FONT_REGULAR = "PlusJakartaSans" if HAS_PLUS_JAKARTA else "Helvetica"
FONT_BOLD = "PlusJakartaSans-Bold" if HAS_PLUS_JAKARTA else "Helvetica-Bold"
FONT_MEDIUM = "PlusJakartaSans-Medium" if HAS_PLUS_JAKARTA else ("PlusJakartaSans" if HAS_PLUS_JAKARTA else "Helvetica")
FONT_SEMIBOLD = "PlusJakartaSans-SemiBold" if HAS_PLUS_JAKARTA else ("PlusJakartaSans-Bold" if HAS_PLUS_JAKARTA else "Helvetica-Bold")
FONT_ITALIC = "PlusJakartaSans-Italic" if HAS_PLUS_JAKARTA else "Helvetica-Oblique"
FONT_BOLDITALIC = "PlusJakartaSans-BoldItalic" if HAS_PLUS_JAKARTA else "Helvetica-BoldOblique"


# =============================================================================
# 1. TEMPLATE REGISTRY MAPPING
# =============================================================================
TEMPLATE_REGISTRY = {
    "puffin": {"layout": "single-column", "accent": "#FA0C40"},
    "caddisfly": {"layout": "creative-accent", "accent": "#2563EB"},
    "stonefly": {"layout": "dark-sidebar", "accent": "#1E3A8A"},
    "mayfly": {"layout": "color-band", "accent": "#065F46"},
    "bunting": {"layout": "compact-table", "accent": "#0F766E"},
    "osprey": {"layout": "sidebar-right", "accent": "#B45309"},
    "drongo": {"layout": "photo-header", "accent": "#6D28D9"},
    "monarch": {"layout": "timeline", "accent": "#BE123C"},
    "albatross": {"layout": "sidebar-left", "accent": "#1F2937"},
    "kingfisher": {"layout": "minimalist", "accent": "#475569"},
    "falcon": {"layout": "single-column", "accent": "#FA0C40"},
    "harrier": {"layout": "creative-accent", "accent": "#2563EB"},
    "kestrel": {"layout": "compact-table", "accent": "#0F766E"},
    "merlin": {"layout": "dark-sidebar", "accent": "#1E3A8A"},
    "gyrfalcon": {"layout": "sidebar-right", "accent": "#B45309"},
    "peregrine": {"layout": "photo-header", "accent": "#6D28D9"},
    "skylark": {"layout": "timeline", "accent": "#BE123C"},
    "avocet": {"layout": "color-band", "accent": "#B45309"},
    "curlew": {"layout": "minimalist", "accent": "#1E293B"},
    "sandpiper": {"layout": "single-column", "accent": "#0F766E"},
    "lapwing": {"layout": "sidebar-right", "accent": "#FA0C40"},
    "starling": {"layout": "photo-header", "accent": "#6D28D9"},
    "oriole": {"layout": "timeline", "accent": "#BE123C"},
    "tanager": {"layout": "sidebar-left", "accent": "#1F2937"},
    "warbler": {"layout": "single-column", "accent": "#FA0C40"},
    "vireo": {"layout": "compact-table", "accent": "#065F46"},
    "pipit": {"layout": "color-band", "accent": "#B45309"},
    "sunbird": {"layout": "minimalist", "accent": "#475569"},
    "waxwing": {"layout": "photo-header", "accent": "#6D28D9"},
    "jacana": {"layout": "creative-accent", "accent": "#2563EB"},
    "barbet": {"layout": "dark-sidebar", "accent": "#1E3A8A"},
    "ibis": {"layout": "sidebar-right", "accent": "#FA0C40"},
    "stork": {"layout": "sidebar-left", "accent": "#1F2937"},
    "heron": {"layout": "timeline", "accent": "#BE123C"},
    "egret": {"layout": "single-column", "accent": "#FA0C40"},
    "flamingo": {"layout": "color-band", "accent": "#065F46"},
    "spoonbill": {"layout": "compact-table", "accent": "#0F766E"},
    "cormorant": {"layout": "minimalist", "accent": "#1E293B"},
    "pelican": {"layout": "photo-header", "accent": "#6D28D9"},
    "gannet": {"layout": "single-column", "accent": "#FA0C40"},
    "booby": {"layout": "color-band", "accent": "#B45309"},
    "petrel": {"layout": "sidebar-right", "accent": "#BE123C"},
    "shearwater": {"layout": "dark-sidebar", "accent": "#1E3A8A"},
    "fulmar": {"layout": "photo-header", "accent": "#6D28D9"},
    "prion": {"layout": "compact-table", "accent": "#065F46"},
    "tropicbird": {"layout": "minimalist", "accent": "#1E293B"},
    "frigatebird": {"layout": "single-column", "accent": "#FA0C40"},
    "jaeger": {"layout": "sidebar-right", "accent": "#B45309"},
    "skua": {"layout": "creative-accent", "accent": "#2563EB"},
    "swift": {"layout": "single-column", "accent": "#065F46"},
    "kite": {"layout": "single-column", "accent": "#FA0C40"},
    "plover": {"layout": "sidebar-left", "accent": "#1F2937"},
    "tern": {"layout": "compact-table", "accent": "#0F766E"},
    "dunlin": {"layout": "color-band", "accent": "#065F46"},
    "teal": {"layout": "sidebar-right", "accent": "#0F766E"},
    "gadwall": {"layout": "photo-header", "accent": "#6D28D9"},
    "shoveler": {"layout": "timeline", "accent": "#BE123C"},
    "pintail": {"layout": "dark-sidebar", "accent": "#1E3A8A"},
    "wigeon": {"layout": "minimalist", "accent": "#475569"},
    "garganey": {"layout": "creative-accent", "accent": "#2563EB"},
}


class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and print 'Page X of Y' in the footer.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont(FONT_REGULAR, 7.5)
        self.setFillColor(colors.HexColor("#64748B"))

        # Footer divider line
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(32, 22, A4[0] - 32, 22)

        # Footer text
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 32, 10, footer_text)
        self.drawString(32, 10, "ResumeCraft Professional Document")
        self.restoreState()


def _clean_text(val):
    if not val:
        return ""
    clean = re.sub(r"<[^>]+>", "", str(val)).strip()
    return html.escape(clean)


def _format_date_range(start_m, start_y, end_m, end_y, is_current):
    """
    Ensures date range formatting is clean and eliminates 'Present 2024' bug.
    """
    sm = _clean_text(start_m).replace("Present", "").replace("present", "").strip()
    sy = _clean_text(start_y).replace("Present", "").replace("present", "").strip()
    start_str = f"{sm} {sy}".strip()

    if is_current:
        end_str = "Present"
    else:
        em = _clean_text(end_m).replace("Present", "").replace("present", "").strip()
        ey = _clean_text(end_y).replace("Present", "").replace("present", "").strip()
        if em == ey or not em:
            end_str = ey
        else:
            end_str = f"{em} {ey}".strip()
        if not end_str:
            end_str = "Present"

    if start_str and end_str:
        return f"{start_str} — {end_str}"
    return start_str or end_str or ""


def _parse_accent_color(hex_str, default="#FA0C40"):
    if not hex_str or not isinstance(hex_str, str):
        return colors.HexColor(default)
    hex_str = hex_str.strip()
    if not hex_str.startswith("#"):
        hex_str = "#" + hex_str
    try:
        return colors.HexColor(hex_str)
    except Exception:
        return colors.HexColor(default)


def _extract_resume_context(resume_data):
    """
    Normalizes resume data dictionary into a consistent structure for layout builders.
    """
    template_key = (
        resume_data.get("templateId")
        or resume_data.get("template_key")
        or resume_data.get("template")
        or "puffin"
    )
    tmpl_meta = TEMPLATE_REGISTRY.get(template_key, {"layout": "single-column", "accent": "#FA0C40"})

    layout_style = (
        resume_data.get("layoutStyle")
        or resume_data.get("layout_style")
        or tmpl_meta.get("layout", "single-column")
    )

    accent_hex = (
        resume_data.get("accentColor")
        or resume_data.get("accent_color")
        or tmpl_meta.get("accent", "#FA0C40")
    )
    accent_color = _parse_accent_color(accent_hex)
    dark_ink = colors.HexColor("#18181B")
    slate_gray = colors.HexColor("#64748B")

    personal = (
        resume_data.get("personalDetails")
        or resume_data.get("personal_details")
        or resume_data.get("personal")
        or {}
    )
    first_name = personal.get("firstName") or personal.get("first_name") or ""
    last_name = personal.get("lastName") or personal.get("last_name") or ""
    full_name = (
        personal.get("fullName")
        or personal.get("full_name")
        or f"{first_name} {last_name}".strip()
        or resume_data.get("fullName")
        or resume_data.get("name")
        or resume_data.get("sampleName")
        or resume_data.get("title")
        or "YOUR NAME"
    )

    job_title = (
        personal.get("jobTitle")
        or personal.get("job_title")
        or resume_data.get("jobTitle")
        or resume_data.get("sampleRole")
        or resume_data.get("target_role")
        or "Professional"
    )
    email = personal.get("email") or resume_data.get("email") or resume_data.get("sampleEmail") or ""
    phone = personal.get("phone") or resume_data.get("phone") or resume_data.get("samplePhone") or ""
    city = personal.get("city") or personal.get("location") or resume_data.get("city") or resume_data.get("sampleLocation") or ""
    country = personal.get("country") or resume_data.get("country") or "India"
    location = ", ".join(filter(None, [city, country])) if city != country else city

    summary = (
        resume_data.get("professional_summary")
        or resume_data.get("summary")
        or resume_data.get("sampleSummary")
        or ""
    )
    clean_summary = _clean_text(summary)

    # Initials for avatar monogram
    name_parts = full_name.split()
    initials = "".join([p[0].upper() for p in name_parts[:2]]) if name_parts else "CV"

    # Social links
    raw_links = (
        resume_data.get("socialLinks")
        or resume_data.get("social_links")
        or resume_data.get("links")
        or resume_data.get("sampleLinks")
        or []
    )
    social_links = []
    for link in raw_links:
        if isinstance(link, dict):
            url = str(link.get("url") or "").strip()
            label = str(link.get("label") or "").strip()
        else:
            url = str(link).strip()
            label = ""
        if url:
            clean_url = url.replace("https://", "").replace("http://", "").strip()
            if not label:
                if "github.com" in clean_url.lower():
                    label = "GitHub"
                elif "linkedin.com" in clean_url.lower():
                    label = "LinkedIn"
                elif "twitter.com" in clean_url.lower() or "x.com" in clean_url.lower():
                    label = "Twitter"
                else:
                    label = "Portfolio"
            social_links.append({"label": label, "url": clean_url})

    # Experiences
    raw_exp = resume_data.get("experiences") or resume_data.get("sampleExperience") or []
    experiences = []
    for exp in raw_exp:
        role = _clean_text(exp.get("role") or exp.get("title") or "")
        company = _clean_text(exp.get("company") or "")
        city_exp = _clean_text(exp.get("city") or exp.get("location") or "")
        desc = exp.get("description") or ""
        bullets = exp.get("bullet_points") or exp.get("bullets") or []

        if not role and not company and not desc and not bullets:
            continue

        start_m = exp.get("startMonth") or exp.get("start_month") or ""
        start_y = exp.get("startYear") or exp.get("start_year") or exp.get("duration") or ""
        end_m = exp.get("endMonth") or exp.get("end_month") or ""
        end_y = exp.get("endYear") or exp.get("end_year") or ""
        is_curr = bool(exp.get("isCurrent") if "isCurrent" in exp else exp.get("is_current", False))

        date_str = _format_date_range(start_m, start_y, end_m, end_y, is_curr)

        bullet_list = []
        if bullets and isinstance(bullets, list):
            bullet_list = [b for b in bullets if str(b).strip()]
        elif desc:
            bullet_list = [l.strip() for l in str(desc).split("\n") if l.strip()]

        cleaned_bullets = []
        for b in bullet_list:
            cb = _clean_text(str(b).lstrip("•-* \t").strip())
            if cb:
                cleaned_bullets.append(cb)

        experiences.append({
            "role": role or "Software Engineer",
            "company": company,
            "city": city_exp,
            "company_loc": " · ".join(filter(None, [company, city_exp])),
            "date_range": date_str,
            "bullets": cleaned_bullets,
        })

    # Education
    raw_edu = resume_data.get("education") or resume_data.get("sampleEducation") or []
    education = []
    for edu in raw_edu:
        deg = _clean_text(edu.get("degree") or "")
        inst = _clean_text(edu.get("institution") or "")
        desc = _clean_text(edu.get("description") or edu.get("field_of_study") or "")
        if not deg and not inst and not desc:
            continue

        start_m = edu.get("startMonth") or edu.get("start_month") or ""
        start_y = edu.get("startYear") or edu.get("start_year") or ""
        end_m = edu.get("endMonth") or edu.get("end_month") or ""
        end_y = edu.get("endYear") or edu.get("end_year") or edu.get("year") or ""
        is_curr = bool(edu.get("isCurrent") if "isCurrent" in edu else edu.get("is_current", False))

        date_str = _format_date_range(start_m, start_y, end_m, end_y, is_curr)

        marks_type = _clean_text(edu.get("marksType") or "CGPA")
        marks = _clean_text(edu.get("marks") or edu.get("grade") or "")
        marks_str = f"{marks_type}: {marks}" if marks else ""

        education.append({
            "degree": deg or "Degree",
            "institution": inst,
            "inst_loc": " · ".join(filter(None, [inst, _clean_text(edu.get("city") or "")])),
            "date_range": date_str,
            "marks_str": marks_str,
            "description": desc,
        })

    # Skills
    raw_skills = resume_data.get("skills") or resume_data.get("sampleSkills") or []
    skills = []
    for s in raw_skills:
        if isinstance(s, dict):
            sname = _clean_text(s.get("name") or "")
            level = s.get("level") or 4
        else:
            sname = _clean_text(str(s))
            level = 4
        if sname:
            skills.append({"name": sname, "level": level})

    # Additional Sections (Projects, Languages, Hobbies, Certifications)
    additional = resume_data.get("additionalSections") or resume_data.get("additional_sections") or {}
    raw_proj = additional.get("projects") or resume_data.get("projects") or resume_data.get("sampleProjects") or []
    projects = []
    for p in raw_proj:
        title = _clean_text(p.get("title") or p.get("name") or "")
        tech = _clean_text(p.get("techStack") or p.get("tech_stack") or "")
        link = p.get("link") or ""
        pdesc = p.get("description") or ""
        if not title and not tech and not pdesc:
            continue
        clean_link = _clean_text(link.replace("https://", "").replace("http://", "")) if link else ""

        pbullets = []
        if pdesc:
            for l in pdesc.split("\n"):
                cl = _clean_text(l.lstrip("•-* \t").strip())
                if cl:
                    pbullets.append(cl)

        projects.append({
            "title": title or "Project",
            "tech_stack": tech,
            "link": clean_link,
            "bullets": pbullets,
        })

    raw_lang = additional.get("languages") or resume_data.get("languages") or resume_data.get("sampleLanguages") or []
    languages = []
    for l in raw_lang:
        if isinstance(l, dict):
            lname = _clean_text(l.get("name") or "")
            lprof = _clean_text(l.get("proficiency") or "")
            if lname:
                languages.append({"name": lname, "proficiency": lprof})
        else:
            l_str = _clean_text(str(l))
            if l_str:
                languages.append({"name": l_str, "proficiency": ""})

    hobbies = _clean_text(
        resume_data.get("hobbies")
        or additional.get("hobbies")
        or resume_data.get("sampleHobbies")
        or ""
    )
    if hobbies:
        parts = [h.strip() for h in hobbies.split(",") if h.strip()]
        unique_h = []
        for h in parts:
            if h.lower() not in [u.lower() for u in unique_h]:
                unique_h.append(h)
        hobbies = ", ".join(unique_h) if unique_h else hobbies

    return {
        "template_key": template_key,
        "layout_style": layout_style,
        "accent_hex": accent_hex,
        "accent_color": accent_color,
        "dark_ink": dark_ink,
        "slate_gray": slate_gray,
        "full_name": full_name,
        "job_title": job_title,
        "location": location,
        "email": email,
        "phone": phone,
        "initials": initials,
        "summary": clean_summary,
        "experiences": experiences,
        "education": education,
        "skills": skills,
        "projects": projects,
        "languages": languages,
        "hobbies": hobbies,
        "social_links": social_links,
    }


# =============================================================================
# 2. LAYOUT BUILDER 1: SINGLE COLUMN / CREATIVE ACCENT (Executive Modern)
# =============================================================================
def _build_single_column_story(ctx):
    styles = getSampleStyleSheet()
    accent = ctx["accent_color"]
    dark_ink = ctx["dark_ink"]
    slate = ctx["slate_gray"]
    is_code = ctx["layout_style"] in ["creative-accent", "single-column-code"]
    
    font_bold = "Courier-Bold" if is_code else FONT_BOLD
    font_sbold = "Courier-Bold" if is_code else FONT_SEMIBOLD
    font_normal = "Courier" if is_code else FONT_REGULAR
    font_oblique = "Courier-Oblique" if is_code else FONT_ITALIC

    name_style = ParagraphStyle(
        "SC_Name", parent=styles["Normal"],
        fontName=font_bold, fontSize=24, leading=28,
        textColor=dark_ink, textTransform="uppercase", spaceAfter=2,
    )
    title_style = ParagraphStyle(
        "SC_Title", parent=styles["Normal"],
        fontName=font_sbold, fontSize=11, leading=15,
        textColor=accent,
    )
    contact_style = ParagraphStyle(
        "SC_Contact", parent=styles["Normal"],
        fontName=font_normal, fontSize=8.5, leading=12,
        textColor=slate, alignment=0,
    )
    section_hdr = ParagraphStyle(
        "SC_SecHdr", parent=styles["Normal"],
        fontName=font_bold, fontSize=10.5, leading=14,
        textColor=accent, textTransform="uppercase",
        spaceBefore=10, spaceAfter=2,
    )
    item_title = ParagraphStyle(
        "SC_ItemTitle", parent=styles["Normal"],
        fontName=font_bold, fontSize=10, leading=13, textColor=dark_ink,
    )
    item_sub = ParagraphStyle(
        "SC_ItemSub", parent=styles["Normal"],
        fontName=font_oblique, fontSize=9, leading=12, textColor=slate,
    )
    item_date = ParagraphStyle(
        "SC_ItemDate", parent=styles["Normal"],
        fontName=font_sbold, fontSize=8.5, leading=12, textColor=dark_ink, alignment=2,
    )
    body_style = ParagraphStyle(
        "SC_Body", parent=styles["Normal"],
        fontName=font_normal, fontSize=9, leading=13.5, textColor=dark_ink,
    )
    bullet_style = ParagraphStyle(
        "SC_Bullet", parent=styles["Normal"],
        fontName=font_normal, fontSize=8.5, leading=12.5, textColor=dark_ink,
        leftIndent=12, firstLineIndent=-12, spaceAfter=2,
    )

    story = []

    # Top Header
    story.append(Paragraph(ctx["full_name"], name_style))
    story.append(Paragraph(f"// {ctx['job_title']}" if is_code else ctx["job_title"], title_style))
    story.append(Spacer(1, 4))

    # Contact line
    contact_parts = []
    if ctx["location"]: contact_parts.append(ctx["location"])
    if ctx["email"]: contact_parts.append(ctx["email"])
    if ctx["phone"]: contact_parts.append(ctx["phone"])
    for l in ctx["social_links"]:
        contact_parts.append(f"{l['label']}: {l['url']}")
    if contact_parts:
        story.append(Paragraph(" &nbsp;•&nbsp; ".join(contact_parts), contact_style))

    story.append(HRFlowable(width="100%", thickness=1.5, color=accent, spaceBefore=6, spaceAfter=8))

    # Professional Summary (Omitted if empty)
    if ctx["summary"]:
        sec_title = "// PROFESSIONAL SUMMARY" if is_code else "Professional Summary"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))
        story.append(Paragraph(ctx["summary"], body_style))
        story.append(Spacer(1, 6))

    # Experience (Omitted if empty)
    if ctx["experiences"]:
        sec_title = "// WORK EXPERIENCE" if is_code else "Work Experience"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for exp in ctx["experiences"]:
            exp_row = Table(
                [[Paragraph(f"<b>{exp['role']}</b>", item_title), Paragraph(exp["date_range"], item_date)]],
                colWidths=[A4[0] - 72 - 140, 140],
            )
            exp_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [exp_row]
            if exp["company_loc"]:
                block.append(Paragraph(exp["company_loc"], item_sub))
                block.append(Spacer(1, 2))
            for b in exp["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 5))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Education (Omitted if empty)
    if ctx["education"]:
        sec_title = "// EDUCATION" if is_code else "Education"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for edu in ctx["education"]:
            edu_row = Table(
                [[Paragraph(f"<b>{edu['degree']}</b>", item_title), Paragraph(edu["date_range"], item_date)]],
                colWidths=[A4[0] - 72 - 120, 120],
            )
            edu_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [edu_row]
            full_sub = " · ".join(filter(None, [edu["inst_loc"], edu["marks_str"]]))
            if full_sub:
                block.append(Paragraph(full_sub, item_sub))
            if edu["description"]:
                block.append(Spacer(1, 1))
                block.append(Paragraph(edu["description"], body_style))
            block.append(Spacer(1, 5))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Skills (Omitted if empty)
    if ctx["skills"]:
        sec_title = "// CORE COMPETENCIES & SKILLS" if is_code else "Core Competencies & Skills"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))
        skills_text = " &nbsp;•&nbsp; ".join([f"<b>{s['name']}</b>" for s in ctx["skills"]])
        story.append(Paragraph(skills_text, body_style))
        story.append(Spacer(1, 6))

    # Projects (Omitted if empty)
    if ctx["projects"]:
        sec_title = "// KEY PROJECTS" if is_code else "Key Projects"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for p in ctx["projects"]:
            p_row = Table(
                [[Paragraph(f"<b>{p['title']}</b>", item_title), Paragraph(p["link"], item_date)]],
                colWidths=[A4[0] - 72 - 160, 160],
            )
            p_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [p_row]
            if p["tech_stack"]:
                block.append(Paragraph(f"Technologies: {p['tech_stack']}", item_sub))
                block.append(Spacer(1, 2))
            for b in p["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 5))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Additional Information (Languages, Hobbies)
    add_items = []
    if ctx["languages"]:
        l_strs = [f"{l['name']} ({l['proficiency']})" if l['proficiency'] else l['name'] for l in ctx["languages"]]
        add_items.append(f"<b>Languages:</b> {', '.join(l_strs)}")
    if ctx["hobbies"]:
        add_items.append(f"<b>Interests & Hobbies:</b> {ctx['hobbies']}")

    if add_items:
        sec_title = "// ADDITIONAL INFORMATION" if is_code else "Additional Information"
        story.append(Paragraph(sec_title, section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))
        for item in add_items:
            story.append(Paragraph(item, body_style))
            story.append(Spacer(1, 3))

    return story


# =============================================================================
# 3. LAYOUT BUILDER 2: TWO-COLUMN SIDEBAR (Sidebar-Left, Dark-Sidebar, Sidebar-Right)
# =============================================================================
def _build_sidebar_story(ctx, is_left=True, is_dark=True):
    """
    Renders a modern two-column resume with a solid sidebar column and a clean main body.
    Uses BaseDocTemplate with FrameBreak to ensure perfect top alignment and clean page breaks.
    """
    styles = getSampleStyleSheet()
    accent = ctx["accent_color"]
    dark_ink = ctx["dark_ink"]
    slate = ctx["slate_gray"]
    
    sidebar_bg = colors.HexColor("#0F172A") if is_dark else accent
    is_sidebar_light = not is_dark and ctx["accent_hex"] in ["#F8FAFC", "#FAFAFA", "#FFFFFF", "#F1F5F9"]
    
    side_text_color = dark_ink if is_sidebar_light else colors.white
    side_muted_color = slate if is_sidebar_light else colors.HexColor("#CBD5E1")
    side_line_color = colors.HexColor("#E2E8F0") if is_sidebar_light else colors.HexColor("#334155")

    # Typography styles for Sidebar
    side_sec_hdr = ParagraphStyle(
        "Side_SecHdr", parent=styles["Normal"],
        fontName=FONT_BOLD, fontSize=9.5, leading=12.5,
        textColor=side_text_color, textTransform="uppercase", spaceBefore=10, spaceAfter=4,
    )
    side_item_bold = ParagraphStyle(
        "Side_ItemBold", parent=styles["Normal"],
        fontName=FONT_BOLD, fontSize=8.5, leading=11.5, textColor=side_text_color, spaceAfter=1,
    )
    side_item_text = ParagraphStyle(
        "Side_ItemText", parent=styles["Normal"],
        fontName=FONT_REGULAR, fontSize=8, leading=11, textColor=side_muted_color, spaceAfter=3,
    )

    # Typography styles for Main Column
    main_name = ParagraphStyle(
        "Main_Name", parent=styles["Normal"],
        fontName=FONT_BOLD, fontSize=24, leading=28, textColor=dark_ink, textTransform="uppercase", spaceAfter=2,
    )
    main_title = ParagraphStyle(
        "Main_Title", parent=styles["Normal"],
        fontName=FONT_SEMIBOLD, fontSize=11, leading=15, textColor=accent, spaceAfter=6,
    )
    main_sec_hdr = ParagraphStyle(
        "Main_SecHdr", parent=styles["Normal"],
        fontName=FONT_BOLD, fontSize=10, leading=13,
        textColor=accent, textTransform="uppercase", spaceBefore=8, spaceAfter=2,
    )
    item_title = ParagraphStyle(
        "Main_ItemTitle", parent=styles["Normal"],
        fontName=FONT_BOLD, fontSize=9.5, leading=12.5, textColor=dark_ink,
    )
    item_sub = ParagraphStyle(
        "Main_ItemSub", parent=styles["Normal"],
        fontName=FONT_ITALIC, fontSize=8.5, leading=11.5, textColor=slate,
    )
    item_date = ParagraphStyle(
        "Main_ItemDate", parent=styles["Normal"],
        fontName=FONT_SEMIBOLD, fontSize=8, leading=11, textColor=slate, alignment=2,
    )
    body_style = ParagraphStyle(
        "Main_Body", parent=styles["Normal"],
        fontName=FONT_REGULAR, fontSize=8.5, leading=12.5, textColor=dark_ink,
    )
    bullet_style = ParagraphStyle(
        "Main_Bullet", parent=styles["Normal"],
        fontName=FONT_REGULAR, fontSize=8.5, leading=12, textColor=dark_ink,
        leftIndent=11, firstLineIndent=-11, spaceAfter=2,
    )

    # 1. SIDEBAR FLOWABLES
    sidebar_flowables = []

    # Initials Avatar Badge
    avatar_table = Table(
        [[Paragraph(f"<font size=16 color='white'><b>{ctx['initials']}</b></font>", ParagraphStyle("Av", alignment=1))]],
        colWidths=[46],
        rowHeights=[46],
    )
    avatar_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), accent),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    sidebar_flowables.append(avatar_table)
    sidebar_flowables.append(Spacer(1, 10))

    # Contact Section
    sidebar_flowables.append(Paragraph("CONTACT", side_sec_hdr))
    sidebar_flowables.append(HRFlowable(width="100%", thickness=0.5, color=side_line_color, spaceBefore=1, spaceAfter=4))
    if ctx["location"]:
        sidebar_flowables.append(Paragraph("<b>Location</b>", side_item_bold))
        sidebar_flowables.append(Paragraph(ctx["location"], side_item_text))
    if ctx["email"]:
        sidebar_flowables.append(Paragraph("<b>Email</b>", side_item_bold))
        sidebar_flowables.append(Paragraph(ctx["email"], side_item_text))
    if ctx["phone"]:
        sidebar_flowables.append(Paragraph("<b>Phone</b>", side_item_bold))
        sidebar_flowables.append(Paragraph(ctx["phone"], side_item_text))
    for l in ctx["social_links"]:
        sidebar_flowables.append(Paragraph(f"<b>{l['label']}</b>", side_item_bold))
        sidebar_flowables.append(Paragraph(l["url"], side_item_text))

    # Skills Section (Omitted if empty)
    if ctx["skills"]:
        sidebar_flowables.append(Paragraph("EXPERTISE & SKILLS", side_sec_hdr))
        sidebar_flowables.append(HRFlowable(width="100%", thickness=0.5, color=side_line_color, spaceBefore=1, spaceAfter=4))
        for s in ctx["skills"]:
            pct = s["level"] * 20
            sidebar_flowables.append(Paragraph(f"• <b>{s['name']}</b> ({pct}%)", side_item_text))
            sidebar_flowables.append(Spacer(1, 1))

    # Languages Section (Omitted if empty)
    if ctx["languages"]:
        sidebar_flowables.append(Paragraph("LANGUAGES", side_sec_hdr))
        sidebar_flowables.append(HRFlowable(width="100%", thickness=0.5, color=side_line_color, spaceBefore=1, spaceAfter=4))
        for l in ctx["languages"]:
            prof = f" — {l['proficiency']}" if l['proficiency'] else ""
            sidebar_flowables.append(Paragraph(f"• <b>{l['name']}</b>{prof}", side_item_text))

    # Hobbies / Interests (Omitted if empty)
    if ctx["hobbies"]:
        sidebar_flowables.append(Paragraph("INTERESTS", side_sec_hdr))
        sidebar_flowables.append(HRFlowable(width="100%", thickness=0.5, color=side_line_color, spaceBefore=1, spaceAfter=4))
        sidebar_flowables.append(Paragraph(ctx["hobbies"], side_item_text))

    # 2. MAIN COLUMN FLOWABLES
    main_flowables = []

    # Name & Tagline
    main_flowables.append(Paragraph(ctx["full_name"], main_name))
    main_flowables.append(Paragraph(ctx["job_title"], main_title))
    main_flowables.append(HRFlowable(width="100%", thickness=1, color=accent, spaceBefore=2, spaceAfter=6))

    # Summary (Omitted if empty)
    if ctx["summary"]:
        main_flowables.append(Paragraph("PROFESSIONAL SUMMARY", main_sec_hdr))
        main_flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))
        main_flowables.append(Paragraph(ctx["summary"], body_style))
        main_flowables.append(Spacer(1, 6))

    # Experience (Omitted if empty)
    if ctx["experiences"]:
        main_flowables.append(Paragraph("WORK EXPERIENCE", main_sec_hdr))
        main_flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))

        for exp in ctx["experiences"]:
            exp_row = Table(
                [[Paragraph(f"<b>{exp['role']}</b>", item_title), Paragraph(exp["date_range"], item_date)]],
                colWidths=[350 - 110, 110],
            )
            exp_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [exp_row]
            if exp["company_loc"]:
                block.append(Paragraph(exp["company_loc"], item_sub))
                block.append(Spacer(1, 1))
            for b in exp["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 4))
            main_flowables.append(KeepTogether(block))
        main_flowables.append(Spacer(1, 2))

    # Education (Omitted if empty)
    if ctx["education"]:
        main_flowables.append(Paragraph("EDUCATION", main_sec_hdr))
        main_flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))

        for edu in ctx["education"]:
            edu_row = Table(
                [[Paragraph(f"<b>{edu['degree']}</b>", item_title), Paragraph(edu["date_range"], item_date)]],
                colWidths=[350 - 90, 90],
            )
            edu_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [edu_row]
            full_sub = " · ".join(filter(None, [edu["inst_loc"], edu["marks_str"]]))
            if full_sub:
                block.append(Paragraph(full_sub, item_sub))
            if edu["description"]:
                block.append(Spacer(1, 1))
                block.append(Paragraph(edu["description"], body_style))
            block.append(Spacer(1, 4))
            main_flowables.append(KeepTogether(block))
        main_flowables.append(Spacer(1, 2))

    # Projects (Omitted if empty)
    if ctx["projects"]:
        main_flowables.append(Paragraph("KEY PROJECTS", main_sec_hdr))
        main_flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))

        for p in ctx["projects"]:
            p_row = Table(
                [[Paragraph(f"<b>{p['title']}</b>", item_title), Paragraph(p["link"], item_date)]],
                colWidths=[350 - 130, 130],
            )
            p_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [p_row]
            if p["tech_stack"]:
                block.append(Paragraph(f"Tech: {p['tech_stack']}", item_sub))
                block.append(Spacer(1, 1))
            for b in p["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 4))
            main_flowables.append(KeepTogether(block))

    return {
        "sidebar_flowables": sidebar_flowables,
        "main_flowables": main_flowables,
        "sidebar_bg": sidebar_bg,
        "is_left": is_left,
    }


# =============================================================================
# 4. LAYOUT BUILDER 3: MINIMALIST SERIF (Classic Typography)
# =============================================================================
def _build_minimalist_serif_story(ctx):
    styles = getSampleStyleSheet()
    accent = ctx["accent_color"]
    dark_ink = ctx["dark_ink"]
    slate = ctx["slate_gray"]

    name_style = ParagraphStyle(
        "Min_Name", parent=styles["Normal"],
        fontName="Times-Bold", fontSize=22, leading=26,
        textColor=dark_ink, textTransform="uppercase", alignment=1,
    )
    title_style = ParagraphStyle(
        "Min_Title", parent=styles["Normal"],
        fontName="Times-Bold", fontSize=10.5, leading=14,
        textColor=accent, alignment=1,
    )
    contact_style = ParagraphStyle(
        "Min_Contact", parent=styles["Normal"],
        fontName="Times-Roman", fontSize=8.5, leading=12,
        textColor=slate, alignment=1,
    )
    section_hdr = ParagraphStyle(
        "Min_SecHdr", parent=styles["Normal"],
        fontName="Times-Bold", fontSize=10.5, leading=14,
        textColor=dark_ink, textTransform="uppercase",
        spaceBefore=10, spaceAfter=2,
    )
    item_title = ParagraphStyle(
        "Min_ItemTitle", parent=styles["Normal"],
        fontName="Times-Bold", fontSize=10, leading=13, textColor=dark_ink,
    )
    item_sub = ParagraphStyle(
        "Min_ItemSub", parent=styles["Normal"],
        fontName="Times-Italic", fontSize=9, leading=12, textColor=slate,
    )
    item_date = ParagraphStyle(
        "Min_ItemDate", parent=styles["Normal"],
        fontName="Times-Roman", fontSize=8.5, leading=12, textColor=slate, alignment=2,
    )
    body_style = ParagraphStyle(
        "Min_Body", parent=styles["Normal"],
        fontName="Times-Roman", fontSize=9, leading=13.5, textColor=dark_ink,
    )
    bullet_style = ParagraphStyle(
        "Min_Bullet", parent=styles["Normal"],
        fontName="Times-Roman", fontSize=9, leading=13, textColor=dark_ink,
        leftIndent=12, firstLineIndent=-12, spaceAfter=2,
    )

    story = []

    # Centered Header
    story.append(Paragraph(ctx["full_name"], name_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(ctx["job_title"], title_style))
    story.append(Spacer(1, 3))

    contact_parts = []
    if ctx["location"]: contact_parts.append(ctx["location"])
    if ctx["email"]: contact_parts.append(ctx["email"])
    if ctx["phone"]: contact_parts.append(ctx["phone"])
    for l in ctx["social_links"]:
        contact_parts.append(f"{l['label']}: {l['url']}")

    if contact_parts:
        story.append(Paragraph(" • ".join(contact_parts), contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.8, color=accent, spaceBefore=2, spaceAfter=8))

    # Summary
    if ctx["summary"]:
        story.append(Paragraph("Summary", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=4))
        story.append(Paragraph(ctx["summary"], body_style))
        story.append(Spacer(1, 6))

    # Experience
    if ctx["experiences"]:
        story.append(Paragraph("Experience", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for exp in ctx["experiences"]:
            exp_row = Table(
                [[Paragraph(f"<b>{exp['role']}</b>, <i>{exp['company']}</i>", item_title), Paragraph(exp["date_range"], item_date)]],
                colWidths=[A4[0] - 72 - 130, 130],
            )
            exp_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [exp_row]
            if exp["city"]:
                block.append(Paragraph(exp["city"], item_sub))
            for b in exp["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 5))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Education
    if ctx["education"]:
        story.append(Paragraph("Education", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for edu in ctx["education"]:
            edu_row = Table(
                [[Paragraph(f"<b>{edu['institution']}</b> — {edu['degree']}", item_title), Paragraph(edu["date_range"], item_date)]],
                colWidths=[A4[0] - 72 - 120, 120],
            )
            edu_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [edu_row]
            if edu["marks_str"]:
                block.append(Paragraph(edu["marks_str"], item_sub))
            if edu["description"]:
                block.append(Paragraph(edu["description"], item_sub))
            block.append(Spacer(1, 4))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Skills
    if ctx["skills"]:
        story.append(Paragraph("Competencies & Skills", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))
        story.append(Paragraph(" • ".join([s["name"] for s in ctx["skills"]]), body_style))
        story.append(Spacer(1, 6))

    # Projects
    if ctx["projects"]:
        story.append(Paragraph("Projects", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))

        for p in ctx["projects"]:
            p_row = Table(
                [[Paragraph(f"<b>{p['title']}</b> ({p['tech_stack']})", item_title), Paragraph(p["link"], item_date)]],
                colWidths=[A4[0] - 72 - 140, 140],
            )
            p_row.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]))
            block = [p_row]
            for b in p["bullets"]:
                block.append(Paragraph(f"&bull;&nbsp;&nbsp;{b}", bullet_style))
            block.append(Spacer(1, 4))
            story.append(KeepTogether(block))
        story.append(Spacer(1, 3))

    # Additional
    add_items = []
    if ctx["languages"]:
        l_strs = [l["name"] for l in ctx["languages"]]
        add_items.append(f"<b>Languages:</b> {', '.join(l_strs)}")
    if ctx["hobbies"]:
        add_items.append(f"<b>Interests:</b> {ctx['hobbies']}")

    if add_items:
        story.append(Paragraph("Additional Information", section_hdr))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceBefore=1, spaceAfter=5))
        for item in add_items:
            story.append(Paragraph(item, body_style))
            story.append(Spacer(1, 2))

    return story


# =============================================================================
# 5. MASTER DISPATCHER: generate_resume_pdf
# =============================================================================
def generate_resume_pdf(resume_data):
    """
    Builds an executive A4 PDF file matching the template's layout family.
    Returns bytes of the generated PDF document.
    """
    ctx = _extract_resume_context(resume_data)
    layout = ctx["layout_style"]
    buffer = io.BytesIO()

    # Handle Sidebar Layouts via BaseDocTemplate with FrameBreak
    if layout in ["sidebar-left", "dark-sidebar", "sidebar-right"]:
        is_dark = layout == "dark-sidebar"
        is_left = layout in ["sidebar-left", "dark-sidebar"]
        cfg = _build_sidebar_story(ctx, is_left=is_left, is_dark=is_dark)

        sidebar_width = 160
        margin = 32
        gutter = 16

        if is_left:
            side_x = margin
            side_w = sidebar_width
            main_x = margin + sidebar_width + gutter
            main_w = A4[0] - main_x - margin
        else:
            main_x = margin
            main_w = A4[0] - margin - sidebar_width - gutter - margin
            side_x = margin + main_w + gutter
            side_w = sidebar_width

        frame_h = A4[1] - (margin * 2) - 10

        frame_side = Frame(
            side_x, margin + 10, side_w, frame_h,
            id="F_Side", topPadding=6, bottomPadding=6, leftPadding=4, rightPadding=4
        )
        frame_main = Frame(
            main_x, margin + 10, main_w, frame_h,
            id="F_Main", topPadding=6, bottomPadding=6, leftPadding=4, rightPadding=4
        )
        frame_full = Frame(
            margin, margin + 10, A4[0] - (margin * 2), frame_h,
            id="F_Full", topPadding=6, bottomPadding=6, leftPadding=4, rightPadding=4
        )

        sidebar_bg = cfg["sidebar_bg"]

        def on_page_sidebar(canv, doc):
            canv.saveState()
            # Draw colored sidebar background
            canv.setFillColor(sidebar_bg)
            if is_left:
                canv.rect(0, 0, margin + sidebar_width + (gutter / 2), A4[1], fill=1, stroke=0)
            else:
                canv.rect(side_x - (gutter / 2), 0, A4[0] - side_x + (gutter / 2), A4[1], fill=1, stroke=0)
            canv.restoreState()

        doc = BaseDocTemplate(buffer, pagesize=A4, leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0)
        
        if is_left:
            pt_p1 = PageTemplate(id="Page1_TwoCol", frames=[frame_side, frame_main], onPage=on_page_sidebar)
        else:
            pt_p1 = PageTemplate(id="Page1_TwoCol", frames=[frame_main, frame_side], onPage=on_page_sidebar)

        pt_p2 = PageTemplate(id="Page2_Full", frames=[frame_full])
        doc.addPageTemplates([pt_p1, pt_p2])

        story = []
        if is_left:
            story.extend(cfg["sidebar_flowables"])
            story.append(NextPageTemplate("Page2_Full"))
            story.append(FrameBreak())
            story.extend(cfg["main_flowables"])
        else:
            story.extend(cfg["main_flowables"])
            story.append(NextPageTemplate("Page2_Full"))
            story.append(FrameBreak())
            story.extend(cfg["sidebar_flowables"])

        doc.build(story, canvasmaker=NumberedCanvas)

    else:
        # Single-Column / Minimalist / Color-band / Timeline / Photo-header / Compact-table
        doc = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            leftMargin=36,
            rightMargin=36,
            topMargin=36,
            bottomMargin=36,
        )

        if layout in ["minimalist", "classic-serif", "oxford"]:
            story = _build_minimalist_serif_story(ctx)
        else:
            story = _build_single_column_story(ctx)

        doc.build(story, canvasmaker=NumberedCanvas)

    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
