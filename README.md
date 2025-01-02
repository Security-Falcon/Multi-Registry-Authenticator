# Multi Registry Authenticator (MRA)

## About

### Overview
This Action enables bulk login to multiple container registries at once

### Why did write this action?
When using the official login action provided by Docker, there is no possibility to login into multiple registries at once.  
Therefore, I wanted to enable this feature and eliminate the need to run the login action N times within a workflow.

### How does this action Work?
The action works very simple. It loops over a semicolon separated string of registries and logs into them.

### What are the limitations of this Action?
This action in its 1st version does not support logout from registries as post job stage. This feature will be supported soon in the 2nd version.

## Usage
Using this Action is just as simple as using the official Docker/login-action. 
> [!CAUTION]
> Please store registry access credentials in a secure place such as [GitHub Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

### Input
- `registries`:
   - Required: Yes
   - Description: A Multi-line string containing all registries to log into. Each in the format: `REGISTRY_HOST;USERNAME;PASSWORD`

### Example
Below is an example on how to use this action in your workflow:
```yaml
...
  steps:
      - name: Login to GitHub Container Registry
        uses: Security-Falcon/Multi-Registry-Authenticator@v1 # Please use full commit hash of the version tag
        with:
          registries: |
            ghcr.io;${{ secrets.GHCR_USERNAME }};${{ secrets.GHCR_PASSWORD }}
            registry.gitlab.com;${{ secrets.GITLAB_USERNAME }};${{ secrets.GITLAB_PASSWORD }}
...
```
