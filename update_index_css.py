import re

with open('src/index.css', 'r') as f:
    content = f.read()

theme_block = """
@theme {
  --color-saffron-50: #FFF9F0;
  --color-saffron-100: #FFF0D4;
  --color-saffron-200: #FFE0A3;
  --color-saffron-300: #FFCA6B;
  --color-saffron-400: #FFAD2E;
  --color-saffron-500: #FF8E00;
  --color-saffron-600: #EB7100;
  --color-saffron-700: #C25300;
  --color-saffron-800: #993F08;
  --color-saffron-900: #7A340C;
  --color-saffron-950: #421802;
  
  --color-temple-50: #F6F5F4;
  --color-temple-100: #EAE8E5;
  --color-temple-200: #D3CFCB;
  --color-temple-300: #B4AEA9;
  --color-temple-400: #968F89;
  --color-temple-500: #7D756F;
  --color-temple-600: #645D58;
  --color-temple-700: #524C48;
  --color-temple-800: #46413E;
  --color-temple-900: #3D3836;
  --color-temple-950: #262321;
}

"""

if '@theme' not in content:
    content = content.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + theme_block)
    
with open('src/index.css', 'w') as f:
    f.write(content)
