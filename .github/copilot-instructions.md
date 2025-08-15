# Congratulations App
      
A Blazor WebAssembly (.NET 9) application that displays animated lyrics with confetti effects, sparkles, and trippy gradient backgrounds. Built to celebrate achievements with style.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- **CRITICAL**: Install .NET 9.0 SDK first (required for .NET 9 targets):
- `wget https://dotnetcli.azureedge.net/dotnet/Sdk/9.0.103/dotnet-sdk-9.0.103-linux-x64.tar.gz`
- `mkdir -p /home/runner/dotnet && tar -xzf dotnet-sdk-9.0.103-linux-x64.tar.gz -C /home/runner/dotnet`
- `export PATH="/home/runner/dotnet:$PATH" && export DOTNET_ROOT="/home/runner/dotnet"`
- Verify: `dotnet --version` should show 9.0.103
- Bootstrap and build the repository:
- `dotnet build` -- First build takes 25+ seconds due to package restore. NEVER CANCEL. Set timeout to 60+ minutes.
- Subsequent builds: `dotnet build --no-restore` -- takes ~4 seconds. Set timeout to 30+ minutes.
│   └── wwwroot/
│       ├── index.html
│       ├── css/
│       │   ├── app.css
│       │   └── congrats.css (main animations)
│       ├── js/
│       │   ├── congrats.js (confetti effects)
│       │   └── sparkles.js (background sparkles)
│       └── favicon files (svg, png variants)
├── CongratulationsApp.sln
├── README.md
├── package.json (for favicon generation)
└── generate-favicons.js (has hardcoded paths)
```

### Key Project File Contents

#### CongratulationsApp.csproj
```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
<PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
</PropertyGroup>
<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="9.0.3" />
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.DevServer" Version="9.0.3" PrivateAssets="all" />
</ItemGroup>
</Project>
```

#### package.json
```json
{
"dependencies": {
    "canvas": "^3.1.2"
}
}
```

## Important Code Locations

- **Main page**: `CongratulationsApp/Pages/Home.razor` - Contains lyrics and Blazor component logic
- **Animations**: `CongratulationsApp/wwwroot/css/congrats.css` - Complex CSS animations for trippy backgrounds and text effects  
- **Confetti system**: `CongratulationsApp/wwwroot/js/congrats.js` - JavaScript confetti burst effects synchronized with lyrics
- **Background effects**: `CongratulationsApp/wwwroot/js/sparkles.js` - Parallax sparkle layer with mouse interaction
- **App entry**: `CongratulationsApp/Program.cs` - Standard Blazor WebAssembly bootstrapping
- **Layout**: `CongratulationsApp/Layout/MainLayout.razor` - App shell with navigation

## Known Issues and Limitations

- `generate-favicons.js` contains hardcoded file paths and will fail without modification
- No unit tests exist - all validation must be manual
- Requires .NET 9.0 SDK (not available in standard environments)
- Application requires browser for interactive testing
- Some effects may not work with `prefers-reduced-motion` settings

## Deployment

- Deploys to Azure Static Web Apps via `.github/workflows/azure-static-web-apps-red-field-0a65a3910.yml`
- Build configuration: app location `./CongratulationsApp`, output location `wwwroot`
- No API backend required

## Dependencies and SDKs

- **.NET 9.0 SDK** (REQUIRED): Download from https://dotnetcli.azureedge.net/dotnet/Sdk/9.0.103/dotnet-sdk-9.0.103-linux-x64.tar.gz
- **Node.js** (for favicon generation): Already available in most environments
- **Browser** (for testing): Required for manual validation of effects and animations