from svgwrite import Drawing

# Create an SVG file
dwg = Drawing("collaboration_platform_design.svg", profile="tiny", size=("1000px", "800px"))

# Background
dwg.add(dwg.rect(insert=(0, 0), size=("100%", "100%"), fill="#F4F0FB"))  # Light purple

# Header
dwg.add(dwg.rect(insert=(0, 0), size=("100%", "80px"), fill="#6C63FF"))  # Premium purple header
dwg.add(dwg.text("Collaboration Platform", insert=(30, 50), fill="white", font_size="24px", font_family="Arial"))

# Dashboard Section
dwg.add(dwg.rect(insert=(20, 100), size=("460px", "600px"), fill="white", stroke="#6C63FF", stroke_width="2px", rx=15))
dwg.add(dwg.text("Your Documents", insert=(50, 150), fill="#6C63FF", font_size="20px", font_family="Arial"))
# Example documents
for i in range(5):
    y_offset = 180 + (i * 80)
    dwg.add(dwg.rect(insert=(40, y_offset), size=("400px", "60px"), fill="#ECEBFF", rx=10))
    dwg.add(dwg.text(f"Document {i+1}", insert=(60, y_offset + 35), fill="#6C63FF", font_size="16px", font_family="Arial"))

# Editor Section
dwg.add(dwg.rect(insert=(500, 100), size=("460px", "600px"), fill="white", stroke="#6C63FF", stroke_width="2px", rx=15))
dwg.add(dwg.text("Editor", insert=(530, 150), fill="#6C63FF", font_size="20px", font_family="Arial"))
# Text area
dwg.add(dwg.rect(insert=(520, 180), size=("420px", "420px"), fill="#ECEBFF", rx=10))
dwg.add(dwg.text("Type here...", insert=(540, 210), fill="#9B9B9B", font_size="16px", font_family="Arial"))

# Collaborators Section
dwg.add(dwg.text("Collaborators", insert=(530, 630), fill="#6C63FF", font_size="16px", font_family="Arial"))
for i, name in enumerate(["Alice", "Bob", "Charlie"]):
    dwg.add(dwg.circle(center=(550 + i * 70, 680), r=20, fill="#6C63FF"))
    dwg.add(dwg.text(name[0], insert=(545 + i * 70, 685), fill="white", font_size="16px", font_family="Arial"))

# Save SVG
dwg.save()
