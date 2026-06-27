import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Wait, the problem in index.tsx and _layout.tsx might not be {} comments.
    # The previous `sed` commands `sed -i 's/{.*}//'` destroyed imports like `import { Link } from 'expo-router'`!
    # Let's verify we've restored them properly now.

    # Fix JSX comments `{/* */}` safely
    content = re.sub(r'\{\s*/\*.*?\*/\s*\}', '', content, flags=re.DOTALL)

    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if '// Dynamic require to prevent evaluating react-native-maps on web' in line:
            continue
        if '// SECURITY: Never hardcode or bundle OpenAI keys in client applications. Use Settings UI instead.' in line:
            line = line.replace(' // SECURITY: Never hardcode or bundle OpenAI keys in client applications. Use Settings UI instead.', '')
        if 'We render our own label inside tabBarIcon' in line:
            line = line.replace(' // We render our own label inside tabBarIcon', '')
        if 'Outer pill background' in line:
            line = re.sub(r' // Outer pill background.*', '', line)

        new_lines.append(line)

    final_content = '\n'.join(new_lines)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(final_content)

process_file('app/(tabs)/_layout.tsx')
process_file('app/(tabs)/index.tsx')
process_file('app/(tabs)/discover.tsx')
process_file('src/stores/useBrewStore.ts')
