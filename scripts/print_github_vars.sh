#!/usr/bin/env bash
# Reads existing GCP resources and prints GitHub Environment Variables + Secrets.
# Usage: ./scripts/print_github_vars.sh <staging|production>
set -euo pipefail

# ─── Configuration (must match gcp_setup.sh) ──────────────────
PROJECT_ID_STAGING="chemistry-code-staging"
PROJECT_ID_PRODUCTION="chemistry-code-production"
REGION="us-central1"
DOMAIN_STAGING="app.staging.chemtut.com"
DOMAIN_PRODUCTION="app.chemtut.com"
API_DOMAIN_STAGING="api.staging.chemtut.com"
API_DOMAIN_PRODUCTION="api.chemtut.com"
SQL_INSTANCE="postgres"
SQL_DB="app"
# ──────────────────────────────────────────────────────────────

ENV="${1:?Usage: $0 <staging|production>}"
case "$ENV" in
  staging|production) ;;
  *) echo "Error: argument must be 'staging' or 'production'"; exit 1 ;;
esac

PROJECT_ID_VAR="PROJECT_ID_$(echo "$ENV" | tr '[:lower:]' '[:upper:]')"
PROJECT_ID="${!PROJECT_ID_VAR}"
DOMAIN_VAR="DOMAIN_$(echo "$ENV" | tr '[:lower:]' '[:upper:]')"
DOMAIN="${!DOMAIN_VAR}"
API_DOMAIN_VAR="API_DOMAIN_$(echo "$ENV" | tr '[:lower:]' '[:upper:]')"
API_DOMAIN="${!API_DOMAIN_VAR}"

SA_NAME="deploy"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
WIF_POOL="github-pool"
WIF_PROVIDER="github-provider"
BUCKET="${PROJECT_ID}-frontend"

PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
WIF_PROVIDER_FULL="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/providers/${WIF_PROVIDER}"
CLOUDSQL_CONNECTION="${PROJECT_ID}:${REGION}:${SQL_INSTANCE}"
IAM_DB_USER="${SA_EMAIL%.gserviceaccount.com}"

echo ""
echo "============================================"
echo " GitHub Environment Variables for: ${ENV}"
echo "============================================"
echo " Repo → Settings → Environments → ${ENV} → Variables"
echo ""
echo "  GCP_PROJECT_ID            = ${PROJECT_ID}"
echo "  GCP_REGION                = ${REGION}"
echo "  WIF_PROVIDER              = ${WIF_PROVIDER_FULL}"
echo "  WIF_SERVICE_ACCOUNT       = ${SA_EMAIL}"
echo "  GCS_BUCKET                = ${BUCKET}"
echo "  CLOUDSQL_CONNECTION       = ${CLOUDSQL_CONNECTION}"
echo "  DB_IAM_USER               = ${IAM_DB_USER}"
echo "  DB_NAME                   = ${SQL_DB}"
echo "  CLOUD_RUN_SERVICE_ACCOUNT = ${SA_EMAIL}"
echo "  CORS_ORIGIN               = https://${DOMAIN}"
echo "  VITE_API_URL              = https://${API_DOMAIN}"
echo "  BETTER_AUTH_URL           = https://${API_DOMAIN}"
echo "  FRONTEND_URL              = https://${DOMAIN}"
echo ""
echo "============================================"
echo " GitHub Secrets for: ${ENV}"
echo "============================================"
echo " Repo → Settings → Environments → ${ENV} → Secrets"
echo ""
echo "  BETTER_AUTH_SECRET   = (run: openssl rand -base64 32)"
echo "  GOOGLE_CLIENT_ID     = <from Google Cloud Console OAuth credentials>"
echo "  GOOGLE_CLIENT_SECRET = <from Google Cloud Console OAuth credentials>"
echo "  APPLE_CLIENT_ID      = <from Apple Developer Console>"
echo "  APPLE_CLIENT_SECRET  = <from Apple Developer Console>"
echo ""
